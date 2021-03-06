import BaseService from './base.service';
import { Rating } from '../../database/entities/rating.entity';
import IRatingService from '../interface/rating.service';

export default class RatingService extends BaseService<Rating> implements IRatingService {
  protected getEntityClass(): new () => Rating {
    return Rating;
  }
}
