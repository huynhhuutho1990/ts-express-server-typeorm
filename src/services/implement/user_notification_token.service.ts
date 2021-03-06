import IUserNotificationTokenService from '../interface/user_notification_token.service';
import BaseService from './base.service';
import { UserNotificationToken } from '../../database/entities';
import { In } from 'typeorm';

export default class UserNotificationTokenService
  extends BaseService<UserNotificationToken>
  implements IUserNotificationTokenService {
  protected getEntityClass(): new () => UserNotificationToken {
    return UserNotificationToken;
  }

  async createOrUpdate(token: UserNotificationToken): Promise<UserNotificationToken> {
    let tokenDb = await this.repository.findOne({ token: token.token });

    if (!tokenDb) {
      tokenDb = token;
    } else {
      tokenDb.user_id = token.user_id;
    }

    return this.repository.save(tokenDb);
  }

  async findAllTokenByUserId(uid: string): Promise<UserNotificationToken[]> {
    return this.repository.find({ user_id: uid });
  }

  async removeTokens(tokens: string[]): Promise<number> {
    return this.repository
      .delete({
        token: In(tokens)
      })
      .then((delRes) => delRes.affected);
  }
}
