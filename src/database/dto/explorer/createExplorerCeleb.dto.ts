import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

import BaseEntityDto from '../baseEntity.dto';
import { ExplorerCelebrity } from '../../entities/explorer_celeb.entity';

@Exclude()
class CreateExplorerCelebDto extends BaseEntityDto<ExplorerCelebrity> {
  @IsUUID()
  @IsOptional()
  @Expose()
  public groupId?: string;

  @IsUUID()
  @IsNotEmpty()
  @Expose()
  public celebId: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  public order: number;

  protected getEntityClass(): new () => ExplorerCelebrity {
    return ExplorerCelebrity;
  }
}
export default CreateExplorerCelebDto;
