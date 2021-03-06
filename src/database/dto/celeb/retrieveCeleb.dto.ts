import BaseRetrieveDto from '../baseRetrieve.dto';
import { Celeb } from '../../entities/celeb.entity';
import { Exclude, Expose, Type } from 'class-transformer';
import RetrieveCategoryDto from '../category/retrieveCategory.dto';
import RetrieveCelebMediaDto from './media/retrieveCelebMedia.dto';
import RetrieveStorePriceProductDto from '../store_price_product/storePriceProductDetail.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveCelebDto:
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
 *         video_per_week:
 *           type: integer
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
 */
@Exclude()
export default class RetrieveCelebDto extends BaseRetrieveDto<Celeb> {
  @Expose()
  public name: string;

  @Expose()
  public slug_url: string;

  @Expose()
  public profile?: string;

  @Expose()
  public description?: string;

  @Expose()
  public photo?: string;

  @Expose()
  public video_per_week: number;

  @Expose()
  @Type(() => RetrieveCategoryDto)
  public categories?: RetrieveCategoryDto[];

  @Expose()
  @Type(() => RetrieveCelebMediaDto)
  public medias: RetrieveCelebMediaDto[];

  @Expose()
  @Type(() => RetrieveStorePriceProductDto)
  public store_price_product: RetrieveStorePriceProductDto;

  protected getCurrentClass(): new () => BaseRetrieveDto<Celeb> {
    return RetrieveCelebDto;
  }
  protected getEntityClass(): new () => Celeb {
    return Celeb;
  }
}
