import { Expose, Exclude } from 'class-transformer';

import { RetrieveRequestDto } from '..';
import RetrieveVideoDto from './retrieveVideo.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveVideoWithRequestInfoDto:
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
 *         request:
 *           $ref: '#/components/schemas/RetrieveRequestDto'
 */
@Exclude()
class RetrieveVideoWithRequestInfoDto extends RetrieveVideoDto {
  @Expose()
  public request: RetrieveRequestDto;

  protected getCurrentClass(): new () => RetrieveVideoWithRequestInfoDto {
    return RetrieveVideoWithRequestInfoDto;
  }
}
export default RetrieveVideoWithRequestInfoDto;
