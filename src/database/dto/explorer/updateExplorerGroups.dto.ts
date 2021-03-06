import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

import UpdateExplorerGroupDto from './updateExplorerGroup.dto';

@Exclude()
class UpdateExplorerGroupsDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateExplorerGroupDto)
  @Expose()
  public groups: UpdateExplorerGroupDto[];
}
export default UpdateExplorerGroupsDto;
