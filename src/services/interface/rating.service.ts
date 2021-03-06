import IBaseService from './base.service';
import { Rating } from '../../database/entities/rating.entity';

export default interface IRatingService extends IBaseService<Rating> {}
