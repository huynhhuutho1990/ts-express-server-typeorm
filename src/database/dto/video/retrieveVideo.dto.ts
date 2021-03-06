import { Exclude, Expose, Type } from 'class-transformer';
import BaseRetrieveDto from '../baseRetrieve.dto';
import { Video } from '../../entities';
import { RetrieveUserDto, RetrieveCelebDto } from '..';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveVideoDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         url:
 *           type: string
 *         slug_url:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/RetrieveUserDto'
 *         celeb:
 *           $ref: '#/components/schemas/RetrieveCelebDto'
 */
@Exclude()
export default class RetrieveVideoDto extends BaseRetrieveDto<Video> {
  @Expose()
  public url: string;

  @Expose()
  public slug_url: string;

  @Expose()
  @Type(() => RetrieveUserDto)
  public user: RetrieveUserDto;

  @Expose()
  @Type(() => RetrieveCelebDto)
  public celeb: RetrieveCelebDto;

  protected getCurrentClass(): new () => BaseRetrieveDto<Video> {
    return RetrieveVideoDto;
  }
  protected getEntityClass(): new () => Video {
    return Video;
  }
}
