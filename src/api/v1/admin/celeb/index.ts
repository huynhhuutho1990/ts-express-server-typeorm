import express, { Request, Response } from 'express';

import CelebController from '../../celeb/controller';
import { CelebService } from '../../../../services';

import { SuccessResponse } from '../../../../common/api-response';
import { DEFAULT_PAGE_SIZE } from '../../../../config';
import { BadRequestError } from '../../../../common/api-error';
import Paging from '../../../../common/paging';
import { RetrieveCelebDetailDto } from '../../../../database/dto';

const router = express.Router();
const celebService = new CelebService();

router.get('/all', async (req: Request, res: Response) => {
  const page = new Number(req.query.page).valueOf();
  const limit = req.query.limit ? new Number(req.query.limit).valueOf() : DEFAULT_PAGE_SIZE;

  if (!(page >= 0) || !(limit >= 1)) throw new BadRequestError('page or limit is invalid');

  const celebController = new CelebController(celebService);
  const response: Paging<RetrieveCelebDetailDto> = await celebController.getAll(page, limit);

  new SuccessResponse('Get Data Successfully!', response).send(res);
});

export default router;
