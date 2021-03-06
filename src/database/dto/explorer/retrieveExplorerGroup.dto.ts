import { Expose, Exclude, Type, Transform } from 'class-transformer';

import BaseRetrieveDto from '../baseRetrieve.dto';
import RetrieveCelebForExplorerDto from '../celeb/retrieveCelebForExplorer.dto';
import EXPLORER_GROUP_TYPE from '../../../utils/constants/explorerGroupType';
import { ExplorerCelebrity, ExplorerGroup, ExplorerCategory } from '../../entities';

import EntityUlti from '../../../utils/classes/entity.ulti';
import RetrieveCategoryForExplorerDto from '../category/retrieveCategoryForExplorer.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     RetrieveExplorerGroupDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         label:
 *           type: string
 *         type:
 *           type: string
 *           enum: [celebrity, new celebrity, trendy celebrity, category]
 *         order:
 *           type: integer
 *         explorerCelebs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RetrieveCelebForExplorerDto'
 *         explorerCategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RetrieveCategoryForExplorerDto'
 */
@Exclude()
class RetrieveExplorerGroupDto extends BaseRetrieveDto<ExplorerGroup> {
  @Expose() // properties without Expose decorator won't show in the object
  public title?: string;

  @Expose()
  public label?: string;

  @Expose()
  public type: EXPLORER_GROUP_TYPE;

  @Expose()
  public order: number;

  @Type(() => ExplorerCelebrity)
  @Transform((array) => EntityUlti.convertCelebEntityToCelebExplorerDto(array), { toClassOnly: true })
  @Expose()
  public explorerCelebs?: RetrieveCelebForExplorerDto[];

  @Type(() => ExplorerCategory)
  @Transform((array) => EntityUlti.convertCategoryEntityToCategoryExplorerDto(array), { toClassOnly: true })
  @Expose()
  public explorerCategories?: RetrieveCategoryForExplorerDto[];

  protected getEntityClass(): new () => ExplorerGroup {
    return ExplorerGroup;
  }

  protected getCurrentClass(): new () => RetrieveExplorerGroupDto {
    return RetrieveExplorerGroupDto;
  }
}
export default RetrieveExplorerGroupDto;
