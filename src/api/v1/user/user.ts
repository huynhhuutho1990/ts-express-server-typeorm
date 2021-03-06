import express from 'express';
import RequestWithUser from '../../../interfaces/request.interface';
import { SuccessResponse } from '../../../common/api-response';
import FirebaseAuthMiddleware from '../../../middlewares/verifyToken';
import RequestUtils from '../../../utils/classes/request.utils';
import { RetrieveUserDto, RetrieveRequestDto } from '../../../database/dto';
import { DEFAULT_PAGE_SIZE } from '../../../config';
import { RequestService, VideoService } from '../../../services';
import { convertToDtoPage } from '../../../utils/helpers/paging.helper';
import VideoController from '../video/controller';
import { BadRequestError } from '../../../common/api-error';
import Paging from '../../../common/paging';

const requestService = new RequestService();
const videoService = new VideoService();

const router = express.Router();

router.use(FirebaseAuthMiddleware);

/**
 * @swagger
 * /user/me:
 *   get:
 *     tags:
 *       - User
 *     description: Returns information of a user
 *     responses:
 *       200:
 *         description: The list requests of the user
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
 *                   $ref: '#/components/schemas/RetrieveUserDto'
 */
router.get('/me', async (req: RequestWithUser, res) => {
  const userDB = await RequestUtils.getCurrentUser(req);

  return new SuccessResponse('Success', new RetrieveUserDto(userDB)).send(res);
});

/**
 * @swagger
 * /user/history:
 *   get:
 *     tags:
 *       - User
 *     description: Returns list requests of a user
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The index page of list items to return, start from 0
 *         required: true
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: The numbers of items to return
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The list requests of the user
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
 *                   type: object
 *                   properties:
 *                     entries:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/RetrieveRequestDto'
 *                     total:
 *                       type: integer
 */
router.get('/history', async (req: RequestWithUser, res) => {
  const page = new Number(req.query.page).valueOf();
  const limit = new Number(req.query.limit).valueOf() || DEFAULT_PAGE_SIZE;

  const userDB = await RequestUtils.getCurrentUser(req);
  const uid = userDB.id;

  const result = await requestService.getRequestHistoryByUserId(uid, page, limit);

  const response = convertToDtoPage(result, RetrieveRequestDto);

  return new SuccessResponse('Success', response).send(res);
});

/**
 * @swagger
 * /user/videos:
 *   get:
 *     tags:
 *       - User
 *     description: Returns list videos of a user
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The index page of list items to return, start from 0
 *         required: true
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: The numbers of items to return
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The list videos of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Get Data Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     entries:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/RetrieveRequestDto'
 *                     total:
 *                       type: integer
 */
router.get('/videos', async (req: RequestWithUser, res) => {
  const page = new Number(req.query.page).valueOf();
  const limit = req.query.limit ? new Number(req.query.limit).valueOf() : DEFAULT_PAGE_SIZE;

  if (!(page >= 0) || !(limit >= 1)) throw new BadRequestError('page or limit is invalid');

  const userDB = await RequestUtils.getCurrentUser(req);
  const userId = userDB.id;

  const videoController = new VideoController(videoService, requestService);
  const response: Paging<RetrieveRequestDto> = await videoController.getVideosByUserId(userId, page, limit);

  new SuccessResponse(response.entries.length ? 'Get Data Successfully' : 'No entries found', response).send(res);
});

export default router;
