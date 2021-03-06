import { Exclude, Expose, Type } from 'class-transformer';

import { IsOptional, IsNotEmpty, IsString, IsEnum, IsNumber, IsArray, ValidateNested } from 'class-validator';
import BaseEntityDto from '../baseEntity.dto';
import CreateExplorerCelebDto from './createExplorerCeleb.dto';
import CreateExplorerCategoryDto from './createExplorerCategory.dto';
import { ExplorerGroup } from '../../entities';
import EXPLORER_GROUP_TYPE from '../../../utils/constants/explorerGroupType';

@Exclude()
class CreateExplorerGroupDto extends BaseEntityDto<ExplorerGroup> {
  @IsString()
  @IsOptional()
  @Expose()
  public title?: string;

  @IsString()
  @IsOptional()
  @Expose()
  public label?: string;

  @IsEnum(EXPLORER_GROUP_TYPE)
  @IsNotEmpty()
  @Expose()
  public type: EXPLORER_GROUP_TYPE;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  public order: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExplorerCelebDto)
  @Expose()
  public explorerCelebs?: CreateExplorerCelebDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExplorerCategoryDto)
  @Expose()
  public explorerCategories?: CreateExplorerCategoryDto[];

  protected getEntityClass(): new () => ExplorerGroup {
    return ExplorerGroup;
  }
}
export default CreateExplorerGroupDto;
