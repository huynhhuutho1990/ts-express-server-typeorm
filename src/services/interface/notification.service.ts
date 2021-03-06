import IBaseService from './base.service';
import { Notification } from '../../database/entities/notification.entity';

export default interface INotificationService extends IBaseService<Notification> {}
