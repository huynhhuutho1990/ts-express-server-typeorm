import BaseEntityDto from '../baseEntity.dto';
import { HomeCeleb } from '../../entities/home_celeb.entity';
import { IsUUID, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateHomeCelebDto extends BaseEntityDto<HomeCeleb> {
  @IsUUID()
  @IsNotEmpty()
  public celeb_id: string;

  @IsNumber()
  @IsNotEmpty()
  public order: number;

  protected getEntityClass(): new () => HomeCeleb {
    return HomeCeleb;
  }
}
