import express from 'express';
import { HomeCelebService } from '../../../../services';
import { SuccessResponse } from '../../../../common/api-response';
import { plainToClass } from 'class-transformer';
import { RetrieveHomeCelebDto, CreateHomeCelebDto } from '../../../../database/dto';
import RequestDtoValidator from '../../../../middlewares/requestDtoValidator';
import { HomeCeleb } from '../../../../database/entities/home_celeb.entity';
import { BadRequestError } from '../../../../common/api-error';
import logger from '../../../../common/logger';

const router = express.Router();
const homeCelebService = new HomeCelebService();

// get homepage layout
router.get('/', async (req, res) => {
  // get all homepage celeb by order
  const homeCelebs = await homeCelebService.getAllAndOrder();

  return new SuccessResponse('Success', plainToClass(RetrieveHomeCelebDto, homeCelebs)).send(res);
});

// save homepage layout
router.post('/', RequestDtoValidator(CreateHomeCelebDto), async (req, res) => {
  // convert dtos straight to entities
  let homeCelebs: HomeCeleb[] = plainToClass(HomeCeleb, req.body as Array<any>);
  // assuring request dto is an array of valid HomeCeleb
  if (!(homeCelebs instanceof Array)) {
    throw new BadRequestError('Must provide an array of home celeb');
  }
  logger.info(`Saving homepage content, ${homeCelebs.length} celebs`);
  // save these entities
  homeCelebs = await homeCelebService.saveHomepage(homeCelebs);

  return new SuccessResponse('Success', plainToClass(RetrieveHomeCelebDto, homeCelebs)).send(res);
});

export default router;
