import BaseEntityDto from '../baseEntity.dto';
import { Notification } from '../../entities';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsObject, IsBoolean } from 'class-validator';

export default class NotificationDto extends BaseEntityDto<Notification> {
  protected getEntityClass(): new () => Notification {
    return Notification;
  }

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsOptional()
  public message?: string;

  @IsString()
  @IsOptional()
  public image_url: string;

  @IsObject()
  @IsOptional()
  public payload?: { [key: string]: string };

  @IsUUID()
  @IsOptional()
  public user_id?: string;

  @IsString()
  @IsOptional()
  public fcm_token?: string;

  @IsBoolean()
  @IsOptional()
  public broadcast?: boolean;
}
