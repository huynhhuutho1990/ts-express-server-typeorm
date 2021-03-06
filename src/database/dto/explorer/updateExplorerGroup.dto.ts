import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

import CreateExplorerGroupDto from './createExplorerGroup.dto';

@Exclude()
class UpdateExplorerGroupDto extends CreateExplorerGroupDto {
  @IsUUID()
  @IsOptional()
  @Expose()
  public id?: string;
}
export default UpdateExplorerGroupDto;
