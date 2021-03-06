import { Expose, Exclude, Type } from 'class-transformer';

import BaseRetrieveDto from '../baseRetrieve.dto';
import { ExplorerCelebrity } from '../../entities/explorer_celeb.entity';
import RetrieveCelebDto from '../celeb/retrieveCeleb.dto';

@Exclude()
class RetrieveExplorerCelebDto extends BaseRetrieveDto<ExplorerCelebrity> {
  @Expose()
  @Type(() => RetrieveCelebDto)
  public celeb: RetrieveCelebDto;

  @Expose()
  public order: number;

  protected getEntityClass(): new () => ExplorerCelebrity {
    return ExplorerCelebrity;
  }

  protected getCurrentClass(): new () => RetrieveExplorerCelebDto {
    return RetrieveExplorerCelebDto;
  }
}
export default RetrieveExplorerCelebDto;
