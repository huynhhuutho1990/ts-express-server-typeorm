import BaseService from './base.service';
import { Notification } from '../../database/entities/notification.entity';
import INotificationService from '../interface/notification.service';

export default class NotificationService extends BaseService<Notification> implements INotificationService {
  protected getEntityClass(): new () => Notification {
    return Notification;
  }
}
