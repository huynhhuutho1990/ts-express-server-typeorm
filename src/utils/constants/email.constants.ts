import { Request } from '../../database/entities';
import moment from 'moment';
import numeral from 'numeral';
import { URL_WEB_APP, URL_WEB_HOME, SOURCE_EMAIL_ADDRESS } from '../../config';

export const VideoNotificationEmailSubjectBuilder = (request: Request): string => {
  return `VideoNotificationEmailSubjectBuilder`;
};

export const VideoNotificationEmailBodyBuilder = (request: Request): string => {
  return `VideoNotificationEmailBodyBuilder`;
};

export const RequestNotificationEmailSubjectBuilder = (celebName: string): string => {
  return `RequestNotificationEmailSubjectBuilder`;
};

export const RequestNotificationEmailBodyBuilder = (request: Request): string => {
  return `RequestNotificationEmailBodyBuilder`;
};
