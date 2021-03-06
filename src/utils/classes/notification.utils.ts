import { User, Notification } from '../../database/entities';
import INotification from '../../interfaces/notification.interface';
import NotificationService from '../../services/implement/notification.service';
import FirebaseMessageService from '../../providers/firebase/firebaseMessage.service';
import { UserNotificationTokenService } from '../../services';
import logger from '../../common/logger';
// services
const notificationService = new NotificationService();
const userNotificationTokenService = new UserNotificationTokenService();

export default class NotificationUtils {
  static async sendNotification(uid: string, notification: INotification): Promise<{ success: number; fail: number }>;
  static async sendNotification(user: User, notification: INotification): Promise<{ success: number; fail: number }>;
  static async sendNotification(
    userOrUid: string | User,
    notification: INotification
  ): Promise<{ success: number; fail: number }> {
    const uid = userOrUid instanceof User ? userOrUid.id : userOrUid;

    let noti = this._buildNotification(notification, uid);

    noti = await notificationService.save(noti);

    const userTokens = await userNotificationTokenService.findAllTokenByUserId(uid);
    const tokens = userTokens.map((uToken) => uToken.token);

    return this._sendMultipleDevices(tokens, noti);
  }

  static async sendNotificationToAllUsers(notification: INotification): Promise<{ success: number; fail: number }> {
    const notifications = [];
    const userTokens = await userNotificationTokenService.getAll();

    for (const userToken of userTokens) {
      if (!userToken.user_id) {
        continue;
      }

      const noti = this._buildNotification(notification, userToken.user_id);

      notifications.push(noti);
    }

    await notificationService.saveMany(notifications);

    const tokens = userTokens.map((uToken) => uToken.token);

    return this._sendMultipleDevices(tokens, notification);
  }

  private static async _sendMultipleDevices(
    tokens: string[],
    notification: INotification
  ): Promise<{ success: number; fail: number }> {
    const result = await FirebaseMessageService.sendMultipleDevice(tokens, notification);

    if (result.fail) {
      // asynchronously remove invalid tokens
      userNotificationTokenService.removeTokens(result.failedToken).catch((e) => {
        logger.error(e);
      });
    }

    return result;
  }

  private static _buildNotification(notification: INotification, user_id: string): Notification {
    const noti = new Notification();
    noti.title = notification.title;
    noti.message = notification.message;
    noti.payload = notification.payload;
    noti.image_url = notification.image_url;
    noti.user_id = user_id;

    return noti;
  }
}
