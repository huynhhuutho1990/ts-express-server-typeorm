import { Expose, Exclude, Type, Transform } from 'class-transformer';

import { Rating } from '../../entities/rating.entity';

import EntityUlti from '../../../utils/classes/entity.ulti';
import RetrieveCelebDto from './retrieveCeleb.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveCelebDetailDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         slug_url:
 *           type: string
 *         description:
 *           type: string
 *         photo:
 *           type: string
 *         thumbnail:
 *           type: string
 *         ratings:
 *           type: number
 *         response_time_days:
 *           type: number
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RetrieveCategoryDto'
 *         medias:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RetrieveCelebMediaDto'
 *         store_price_product:
 *           $ref: '#/components/schemas/RetrieveStorePriceProductDto'
 *         suggestion:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RetrieveCelebDto'
 */
@Exclude()
class RetrieveCelebDetailDto extends RetrieveCelebDto {
  @Expose()
  public thumbnail?: string;

  @Type(() => Rating)
  @Transform((array) => EntityUlti.getAverageRating(array), { toClassOnly: true })
  @Expose()
  public ratings: number; //

  @Expose()
  public response_time_days?: number;

  @Type(() => RetrieveCelebDetailDto)
  @Expose()
  public suggestion: RetrieveCelebDetailDto[];

  protected getCurrentClass(): new () => RetrieveCelebDetailDto {
    return RetrieveCelebDetailDto;
  }
}
export default RetrieveCelebDetailDto;
