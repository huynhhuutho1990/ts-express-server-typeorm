import IBaseService from './base.service';
import { CelebMedia } from '../../database/entities/celeb_media.entity';

export default interface ICelebMediaService extends IBaseService<CelebMedia> {}
