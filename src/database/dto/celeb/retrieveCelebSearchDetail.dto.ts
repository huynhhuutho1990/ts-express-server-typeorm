import { Exclude, Expose, Type } from 'class-transformer';
import { RetrieveCelebDto, RetrieveVideoDto } from '..';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveCelebSearchDetailDto:
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
 *         recent_videos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RetrieveVideoDto'
 *         suggestion:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RetrieveCelebDto'
 */
@Exclude()
export default class RetrieveCelebSearchDetailDto extends RetrieveCelebDto {
  @Expose()
  @Type(() => RetrieveVideoDto)
  public recent_videos: RetrieveVideoDto[];

  @Expose()
  @Type(() => RetrieveCelebDto)
  public suggestion: RetrieveCelebDto[];
}
