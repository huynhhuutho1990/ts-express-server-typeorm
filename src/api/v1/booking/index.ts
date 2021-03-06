import express from 'express';
import { SuccessResponse, FailureResponse } from '../../../common/api-response';
import { PronounService, OccasionService, CelebService, ReceiptService } from '../../../services';
import RequestService from '../../../services/implement/request.service';
import BookingDetailDto from '../../../database/dto/booking/bookingDetail.dto';
import {
  RetrieveCelebDto,
  RetrieveOccasionDto,
  RetrievePronounDto,
  RetrieveRequestDto,
  ConfirmBookingDto
} from '../../../database/dto';
import { plainToClass } from 'class-transformer';
import RequestDtoValidator from '../../../middlewares/requestDtoValidator';
import CreateBookingDto from '../../../database/dto/booking/createBooking.dto';
import { AirtableVideoService } from '../../../providers';
import { BadRequestError, ForbiddenError } from '../../../common/api-error';
import { PAYMENT_STATUS_TYPE, RECEIPT_TYPE, PAYMENT_METHOD } from '../../../utils/constants';
import { Receipt } from '../../../database/entities';
import AppleService from '../../../providers/apple/apple.service';
import Mailer from '../../../providers/mailer';
import logger from '../../../common/logger';
import FirebaseAuthMiddleware from '../../../middlewares/verifyToken';
import RequestUtils from '../../../utils/classes/request.utils';
import RequestWithUser from '../../../interfaces/request.interface';

const router = express.Router();
// services
const pronounService = new PronounService();
const occasionService = new OccasionService();
const celebService = new CelebService();
const requestService = new RequestService();
const airtableVideoService = new AirtableVideoService();
const receiptService = new ReceiptService();
const appleService = new AppleService();

router.use(FirebaseAuthMiddleware);

/**
 * @swagger
 * /booking/detail/{celeb_id}:
 *   get:
 *     tags:
 *       - Booking
 *     description: GET booking detail
 *     parameters:
 *       - name: celeb_id
 *         in: path
 *         description: The celebrity's id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The booking detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   $ref: '#/components/schemas/BookingDetailDto'
 */
router.get('/detail/:celeb_id', async (req, res) => {
  const { celeb_id: celebId } = req.params;

  const celeb = await celebService.getById(celebId, ['store_price_product']);
  if (!celeb) {
    throw new BadRequestError('Invalid celeb id');
  }

  const response = new BookingDetailDto();
  response.celeb = new RetrieveCelebDto(celeb);
  response.occasions = plainToClass(RetrieveOccasionDto, await occasionService.getAllWithOrder());
  response.pronouns = plainToClass(RetrievePronounDto, await pronounService.getAllWithOrder());
  return new SuccessResponse('Success', response).send(res);
});

/**
 * @swagger
 * /booking:
 *   post:
 *     tags:
 *       - Booking
 *     description: Create booking
 *     requestBody:
 *       description: The booking info
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingDto'
 *     responses:
 *       200:
 *         description: The request detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   $ref: '#/components/schemas/RetrieveRequestDto'
 */
router.post('/', RequestDtoValidator(CreateBookingDto), async (req: RequestWithUser, res) => {
  const requestDto = plainToClass(CreateBookingDto, req.body);
  let entity = requestDto.toEntityObject();

  const userDB = await RequestUtils.getCurrentUser(req);
  const uid = userDB.id;

  entity.user_id = uid;
  // celeb
  const celeb = await celebService.getById(requestDto.celeb_id, ['store_price_product']);
  if (!celeb) {
    throw new BadRequestError('Invalid celeb_id');
  }
  entity.price = celeb.store_price_product.price;
  entity.display_price = celeb.store_price_product.display_price;

  logger.info(`Creating booking for user(${uid}), celeb(${celeb.id})`);
  entity = await requestService.create(entity);

  logger.info(`Syncing data to Airtable, request number: ${entity.request_number}`);
  await airtableVideoService.createVideoRequestAirTable(entity.request_number);

  // turn off create request.
  throw new BadRequestError('Turn off create request.');
  // return new SuccessResponse('Success', new RetrieveRequestDto(entity)).send(res);
});

/**
 * @swagger
 * /booking/confirm:
 *   post:
 *     tags:
 *       - Booking
 *     description: Verify payment
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmBookingDto'
 *     responses:
 *       200:
 *         description: The request detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   $ref: '#/components/schemas/RetrieveRequestDto'
 */
router.post('/confirm', RequestDtoValidator(ConfirmBookingDto), async (req: RequestWithUser, res) => {
  const confirmBookingDto = plainToClass(ConfirmBookingDto, req.body);

  const user = await RequestUtils.getCurrentUser(req);

  let request = await requestService.getByRequestNumber(confirmBookingDto.request_number, [
    'pronoun',
    'occasion',
    'celeb',
    'celeb.categories',
    'user'
  ]);
  if (!request) {
    throw new BadRequestError('Invalid Booking id');
  } else if (request.user_id !== user.id) {
    throw new ForbiddenError('Can not perform this action. This request belongs to other user');
  } else if (request.payment_status !== PAYMENT_STATUS_TYPE.PENDING) {
    return new SuccessResponse('Success', new RetrieveRequestDto(request)).send(res);
  }

  const toBeUpdate: any = {};

  if (confirmBookingDto.direct_payment) {
    if (!confirmBookingDto.purchase_id || !confirmBookingDto.receipt) {
      throw new BadRequestError('Missing purchase_id or receipt');
    }

    const receiptCheck = await receiptService.getByPurchaseId(confirmBookingDto.purchase_id);
    if (receiptCheck && receiptCheck.request_id !== request.id) {
      throw new ForbiddenError('Receipt was used on other booking request');
    }
    // update request: buyer_email, buyer_phone

    /* start verify receipt */
    let receipt = new Receipt();
    receipt.receipt = confirmBookingDto.receipt;
    receipt.purchase_id = confirmBookingDto.purchase_id;
    receipt.request_id = request.id;
    receipt.status = PAYMENT_STATUS_TYPE.PENDING;
    receipt.type = RECEIPT_TYPE.APPLE;
    // TODO: add google in-app purchase logic
    logger.info(`Verifying receipt. Type: ${receipt.type}, purchase id: ${receipt.purchase_id}`);
    const verifyStatus = await appleService.verifyReceipt(confirmBookingDto.receipt, confirmBookingDto.purchase_id);
    receipt.status = toBeUpdate.payment_status = verifyStatus;
    toBeUpdate.payment_method = PAYMENT_METHOD.APPLE_PAY;
    receipt = await receiptService.save(receipt);
    logger.info(`Receipt verified: ${receipt.id}, status: ${receipt.status}`);
    /* end verify receipt */
  } else {
    // if user hasn't pay yet, update payment status to confirmed
    toBeUpdate.payment_status = PAYMENT_STATUS_TYPE.CONFIRMED;
  }

  // update request
  request = Object.assign(request, toBeUpdate);
  logger.info(`Updating verified booking. Id: ${request.id}, payment status: ${request.payment_status}`);
  request = await requestService.save(request);

  logger.info(`Syncing verified booking to Airtable, request number: ${request.request_number}`);
  await airtableVideoService.updateVideoRequestAirTable(request.request_number);

  // Send email with confirmed details
  if (request.payment_status === PAYMENT_STATUS_TYPE.PAID) {
    request.user = user;
    logger.info(`Sending confirmation email to ${request.buyer_email || user.email}`);
    Mailer.sendRequestNotificationEmail(request);

    return new SuccessResponse('Success', new RetrieveRequestDto(request)).send(res);
  } else {
    return new FailureResponse('Request processing failed', new RetrieveRequestDto(request)).send(res);
  }
});

export default router;
