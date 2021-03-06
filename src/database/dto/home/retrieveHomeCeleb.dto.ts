import { Exclude, Expose, Type } from 'class-transformer';
import BaseRetrieveDto from '../baseRetrieve.dto';
import { HomeCeleb } from '../../entities/home_celeb.entity';
import { RetrieveCelebDto } from '..';

@Exclude()
export default class RetrieveHomeCelebDto extends BaseRetrieveDto<HomeCeleb> {
  @Expose()
  @Type(() => RetrieveCelebDto)
  public celeb: RetrieveCelebDto;

  @Expose()
  public order: number;

  protected getCurrentClass(): new () => BaseRetrieveDto<HomeCeleb> {
    return RetrieveHomeCelebDto;
  }
  protected getEntityClass(): new () => HomeCeleb {
    return HomeCeleb;
  }
}
