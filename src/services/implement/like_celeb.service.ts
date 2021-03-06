import BaseService from './base.service';
import { LikeCeleb } from '../../database/entities/like_celeb.entity';
import ILikeCelebService from '../interface/like_celeb.service';

export default class LikeCelebService extends BaseService<LikeCeleb> implements ILikeCelebService {
  protected getEntityClass(): new () => LikeCeleb {
    return LikeCeleb;
  }
}
