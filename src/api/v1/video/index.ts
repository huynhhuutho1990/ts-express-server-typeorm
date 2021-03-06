import express, { Request, Response } from 'express';

import VideoController from './controller';
import { RequestService, VideoService } from '../../../services';

import { SuccessResponse } from '../../../common/api-response';
import { RetrieveVideoWithRequestInfoDto, RetrieveRequestDto } from '../../../database/dto';

const router = express.Router();

const videoService = new VideoService();
const requestService = new RequestService();

/**
 * @swagger
 * /video/{requestNumber}:
 *   get:
 *     tags:
 *       - Video
 *     description: Returns the information of video by request number
 *     parameters:
 *       - name: requestNumber
 *         in: path
 *         description: request number
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The information of the video
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Get Data Successfully!
 *                 data:
 *                   $ref: '#/components/schemas/RetrieveVideoWithRequestInfoDto'
 */
router.get('/:requestNumber', async (req: Request, res: Response) => {
  const { requestNumber } = req.params;

  const videoController = new VideoController(videoService, requestService);

  const response: RetrieveVideoWithRequestInfoDto = await videoController.getVideoByRequestNumber(requestNumber);

  new SuccessResponse(`Get Data ${response ? 'Successfully' : 'Failed'}!`, response || {}).send(res);
});

/**
 * @swagger
 * /video/detail/{identifier}:
 *   get:
 *     tags:
 *       - Video
 *     description: Returns detail information of video by video id or slug url
 *     parameters:
 *       - name: identifier
 *         in: path
 *         description: video id || slug url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The detail information of video
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Get Data Successfully!
 *                 data:
 *                   $ref: '#/components/schemas/RetrieveVideoWithRequestInfoDto'
 */
router.get('/detail/:identifier', async (req: Request, res: Response) => {
  const { identifier } = req.params;

  const videoController = new VideoController(videoService, requestService);

  const response: RetrieveRequestDto = await videoController.getVideoByIdOrSlugUrl(identifier.toLowerCase());

  new SuccessResponse(`Get Data ${response ? 'Successfully' : 'Failed'}!`, response || {}).send(res);
});

export default router;
