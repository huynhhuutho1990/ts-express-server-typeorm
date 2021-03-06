import BaseService from './base.service';
import { CelebMedia } from '../../database/entities/celeb_media.entity';
import ICelebMediaService from '../interface/celeb_media.service';

export default class CelebMediaService extends BaseService<CelebMedia> implements ICelebMediaService {
  protected getEntityClass(): new () => CelebMedia {
    return CelebMedia;
  }
}
