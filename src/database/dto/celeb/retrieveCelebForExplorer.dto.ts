import { Expose, Exclude } from 'class-transformer';

import RetrieveCelebDto from './retrieveCeleb.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveCelebForExplorerDto:
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
 *         order:
 *           type: integer
 */
@Exclude()
class RetrieveCelebForExplorerDto extends RetrieveCelebDto {
  @Expose()
  public order: number;

  protected getCurrentClass(): new () => RetrieveCelebForExplorerDto {
    return RetrieveCelebForExplorerDto;
  }
}
export default RetrieveCelebForExplorerDto;
