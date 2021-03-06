import BaseRetrieveDto from '../../baseRetrieve.dto';
import { CelebMedia } from '../../../entities/celeb_media.entity';
import { Exclude, Expose } from 'class-transformer';
import { CELEB_MEDIA_TYPE } from '../../../../utils/constants';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveCelebMediaDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *           enum: [video, image]
 *         link:
 *           type: string
 */
@Exclude()
export default class RetrieveCelebMediaDto extends BaseRetrieveDto<CelebMedia> {
  @Expose()
  public type: CELEB_MEDIA_TYPE;

  @Expose()
  public link: string;

  protected getCurrentClass(): new () => RetrieveCelebMediaDto {
    return RetrieveCelebMediaDto;
  }
  protected getEntityClass(): new () => CelebMedia {
    return CelebMedia;
  }
}
