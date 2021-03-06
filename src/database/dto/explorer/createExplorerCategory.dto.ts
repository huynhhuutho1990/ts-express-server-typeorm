import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

import BaseEntityDto from '../baseEntity.dto';
import { ExplorerCategory } from '../../entities/explorer_category.entity';

@Exclude()
class CreateExplorerCategoryDto extends BaseEntityDto<ExplorerCategory> {
  @IsUUID()
  @IsOptional()
  @Expose()
  public groupId?: string;

  @IsUUID()
  @IsNotEmpty()
  @Expose()
  public categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  public order: number;

  protected getEntityClass(): new () => ExplorerCategory {
    return ExplorerCategory;
  }
}
export default CreateExplorerCategoryDto;
