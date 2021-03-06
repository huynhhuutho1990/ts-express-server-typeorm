import IBaseService from './base.service';
import { UserNotificationToken } from '../../database/entities';

export default interface IUserNotificationTokenService extends IBaseService<UserNotificationToken> {
  createOrUpdate(token: UserNotificationToken): Promise<UserNotificationToken>;
  findAllTokenByUserId(uid: string): Promise<UserNotificationToken[]>;
  removeTokens(tokens: string[]): Promise<number>;
}
