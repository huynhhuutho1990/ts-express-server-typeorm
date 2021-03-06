import express from 'express';
import { SuccessResponse } from '../../../common/api-response';
import { HomeCelebService, CelebService, RequestService } from '../../../services';
import { DEFAULT_PAGE_SIZE } from '../../../config';
import { RetrieveCelebDto } from '../../../database/dto';
import Paging from '../../../common/paging';
import { plainToClass } from 'class-transformer';
import { HomeCeleb } from '../../../database/entities/home_celeb.entity';
import Mailer from '../../../providers/mailer';

const router = express.Router();

const homeCelebService = new HomeCelebService();
const celebService = new CelebService();

/**
 * @swagger
 * /home:
 *   get:
 *     tags:
 *       - Home
 *     description: Returns list celebrities for Home Screen
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
 *         description: The list celebrities for Home Screen
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
 *                         $ref: '#/components/schemas/RetrieveCelebDto'
 *                     total:
 *                       type: integer
 */
router.get('/', async (req, res) => {
  const page = new Number(req.query.page).valueOf();
  const limit = req.query.limit ? new Number(req.query.limit).valueOf() : DEFAULT_PAGE_SIZE;

  const homeCelebs = await homeCelebService.getAndOrder(page, limit);

  if (!homeCelebs.entries.length) {
    return new SuccessResponse('No data', new Paging([], homeCelebs.total)).send(res);
  }

  const celebIds: Array<string> = homeCelebs.entries.map((val: HomeCeleb) => val.celeb_id);

  const celebs = await celebService.getCelebsWithCategoryAndMedia(celebIds);

  const celebMap: { [key: string]: any } = {};
  celebs.forEach((celeb) => {
    celebMap[celeb.id] = celeb;
  });

  const result = new Paging<RetrieveCelebDto>();
  const entries = new Array<RetrieveCelebDto>();
  for (let i = 0; i < homeCelebs.entries.length; i++) {
    const homeCeleb = homeCelebs.entries[i];
    const celebDto = plainToClass(RetrieveCelebDto, celebMap[homeCeleb.celeb_id]);
    celebDto && entries.push(celebDto);
  }
  result.entries = entries;
  result.total = homeCelebs.total;

  return new SuccessResponse('Success', result).send(res);
});

const requestService = new RequestService();

router.get('/test-email/:request_number', async (req, res, next) => {
  try {
    const { request_number } = req.params;
    const { email, type } = req.query;
    const request = await requestService.getByRequestNumber(request_number, [
      'pronoun',
      'occasion',
      'celeb',
      'celeb.categories',
      'user',
      'video'
    ]);
    if (email) {
      request.buyer_email = email as string;
    }

    switch (type) {
      case 'confirm':
        await Mailer.sendRequestNotificationEmail(request);
        break;

      case 'video':
        await Mailer.sendVideoNotificationEmail(request);
        break;
    }

    return new SuccessResponse('Success', 'OK').send(res);
  } catch (err) {
    return next(err);
  }
});

export default router;
