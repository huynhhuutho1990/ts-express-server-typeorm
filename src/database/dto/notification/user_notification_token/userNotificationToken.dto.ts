import BaseEntityDto from '../../baseEntity.dto';
import { UserNotificationToken } from '../../../entities/user_notification_token.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export default class UserNotificationTokenDto extends BaseEntityDto<UserNotificationToken> {
  protected getEntityClass(): new () => UserNotificationToken {
    return UserNotificationToken;
  }

  @IsString()
  @IsNotEmpty()
  public token: string;
}
