import { Expose, Exclude, Type } from 'class-transformer';

import BaseRetrieveDto from '../baseRetrieve.dto';
import { ExplorerCategory } from '../../entities/explorer_category.entity';
import RetrieveCategoryDto from '../category/retrieveCategory.dto';

@Exclude()
class RetrieveExplorerCategoryDto extends BaseRetrieveDto<ExplorerCategory> {
  @Expose()
  @Type(() => RetrieveCategoryDto)
  public category: RetrieveCategoryDto;

  @Expose()
  public order: number;

  protected getEntityClass(): new () => ExplorerCategory {
    return ExplorerCategory;
  }

  protected getCurrentClass(): new () => RetrieveExplorerCategoryDto {
    return RetrieveExplorerCategoryDto;
  }
}
export default RetrieveExplorerCategoryDto;
