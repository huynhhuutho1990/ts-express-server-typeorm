import { Expose, Exclude } from 'class-transformer';

import RetrieveCategoryDto from './retrieveCategory.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveCategoryForExplorerDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         order:
 *           type: integer
 */
@Exclude()
class RetrieveCategoryForExplorerDto extends RetrieveCategoryDto {
  @Expose()
  public order: number;

  protected getCurrentClass(): new () => RetrieveCategoryForExplorerDto {
    return RetrieveCategoryForExplorerDto;
  }
}
export default RetrieveCategoryForExplorerDto;
