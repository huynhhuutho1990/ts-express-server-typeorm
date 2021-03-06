import express from 'express';
import { RequestService } from '../../../services';
import { NoEntryError } from '../../../common/api-error';
import { SuccessResponse } from '../../../common/api-response';
import { RetrieveRequestDto } from '../../../database/dto';

const router = express.Router();

const requestService = new RequestService();

/**
 * @swagger
 * /request/{request_number}:
 *   get:
 *     tags:
 *       - Request
 *     description: Get request info
 *     parameters:
 *       - name: request_number
 *         in: path
 *         description: request number
 *         required: true
 *         schema:
 *           type: string
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
router.get('/:requestNumber', async (req, res) => {
  const { requestNumber } = req.params;

  const request = await requestService.getByRequestNumber(requestNumber, ['pronoun', 'occasion', 'celeb', 'user']);

  if (!request) {
    throw new NoEntryError();
  }

  return new SuccessResponse('Success', new RetrieveRequestDto(request)).send(res);
});

export default router;
