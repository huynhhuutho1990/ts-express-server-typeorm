import * as admin from 'firebase-admin';
import { app } from './firebase.config';
import INotification from '../../interfaces/notification.interface';
import logger from '../../common/logger';

const UNREGISTERED = 'messaging/registration-token-not-registered';
const INVALID_ARGUMENT = 'messaging/invalid-argument';

export default class FirebaseMessageService {
  private static _fcm = app.messaging();

  static async sendNotification(token: string, notification: INotification): Promise<boolean> {
    const message: admin.messaging.Message = {
      token,
      ...this._buildBaseMessage(notification)
    };

    try {
      await this._fcm.send(message);
    } catch (e) {
      logger.error(e);
      return false;
    }

    return true;
  }

  static async sendMultipleDevice(
    tokens: string[],
    notification: INotification
  ): Promise<{ success: number; fail: number; failedToken: string[] }> {
    const batch = 400;
    const res: { success: number; fail: number; failedToken: string[] } = {
      success: 0,
      fail: 0,
      failedToken: []
    };

    for (let i = 0; i < tokens.length; i += batch) {
      const tokenBatch = tokens.slice(i, i + batch);

      const message: admin.messaging.MulticastMessage = {
        tokens: tokenBatch,
        ...this._buildBaseMessage(notification)
      };
      const result = await this._fcm.sendMulticast(message);
      res.success = res.success + result.successCount;
      res.fail = res.fail + result.failureCount;

      if (result.failureCount) {
        result.responses.forEach((response, index) => {
          if (response.error) {
            if (response.error.code == UNREGISTERED || response.error.code == INVALID_ARGUMENT) {
              res.failedToken.push(tokens[index]);
            }
          }
        });
      }
    }

    return res;
  }

  private static _buildBaseMessage(notification: INotification): { [key: string]: any } {
    const result: { [key: string]: any } = {
      notification: {
        title: notification.title,
        body: notification.message
      },
      android: {
        notification: {
          clickAction: 'FLUTTER_NOTIFICATION_CLICK',
          defaultSound: true,
          notificationCount: 1,
          priority: 'max',
          visibility: 'public',
          icon: 'ic_notification'
        },
        data: {
          ...notification.payload,
          title: notification.title,
          body: notification.message
        },
        priority: 'high'
      },
      apns: {
        payload: {
          aps: {
            ...notification.payload,
            title: notification.title,
            body: notification.message,
            badge: 1,
            sound: 'default'
          }
        }
      },
      data: {
        ...notification.payload,
        title: notification.title,
        body: notification.message
      }
    };

    if (notification.image_url) {
      result.notification.imageUrl = notification.image_url;
    }

    return result;
  }
}
