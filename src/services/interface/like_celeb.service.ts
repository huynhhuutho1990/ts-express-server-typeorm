import IBaseService from './base.service';
import { LikeCeleb } from '../../database/entities/like_celeb.entity';

export default interface ILikeCelebService extends IBaseService<LikeCeleb> {}
