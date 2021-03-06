import BaseService from './base.service';
import { CelebSocial } from '../../database/entities/celeb_social.entity';
import ICelebSocialService from '../interface/celeb_social.service';

export default class CelebSocialService extends BaseService<CelebSocial> implements ICelebSocialService {
  protected getEntityClass(): new () => CelebSocial {
    return CelebSocial;
  }
}
