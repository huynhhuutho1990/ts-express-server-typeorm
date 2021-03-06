import express, { Request, Response } from 'express';

import CelebController from './controller';
import { CelebService } from './../../../services';

import { SuccessResponse } from '../../../common/api-response';
import { RetrieveCelebDetailDto } from '../../../database/dto';

const router = express.Router();
const celebService = new CelebService();

/**
 * @swagger
 * /celeb/{identifier}:
 *   get:
 *     tags:
 *       - Celebrity
 *     description: Returns celebrity's info by celebrity's id or slug url
 *     parameters:
 *       - name: identifier
 *         in: path
 *         description: celebrity's id or slug url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The celebrity's detail information
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
 *                   $ref: '#/components/schemas/RetrieveCelebDetailDto'
 */
router.get('/:identifier', async (req: Request, res: Response) => {
  const { identifier } = req.params;

  const celebController = new CelebController(celebService);

  const retrieveCelebDetailDto: RetrieveCelebDetailDto = await celebController.get(identifier.toLowerCase());

  new SuccessResponse('Get Data Successfully!', retrieveCelebDetailDto).send(res);
});

export default router;
