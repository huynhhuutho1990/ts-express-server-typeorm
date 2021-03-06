import IMailService from './services/interface/mail.service';
import MailService from './services/implement/ses/mail.service';

import logger from '../../common/logger';
import { Request } from '../../database/entities';
import {
  VideoNotificationEmailSubjectBuilder,
  VideoNotificationEmailBodyBuilder,
  RequestNotificationEmailSubjectBuilder,
  RequestNotificationEmailBodyBuilder
} from '../../utils/constants';

class Mailer {
  private static _MailService: IMailService = new MailService();

  /**
   * send mail to an address
   *
   * @static
   * @param {string[]} to destination email address
   * @param {string} bodyStringInHTMLFormat body of email in HTML format, simple string accepted
   * @param {string} subject subject of email
   * @returns {Promise<boolean>} true if success, false if failed
   * @memberof Mailer
   */
  static async sendEmailToAnAddress(to: string, bodyStringInHTMLFormat: string, subject: string): Promise<boolean> {
    try {
      return await this._MailService.send([to], bodyStringInHTMLFormat, subject);
    } catch (e) {
      logger.error(`Send mail to address: ${to} failed because ${e.message}`);
      return false;
    }
  }

  /**
   * send mail to many address
   *
   * @static
   * @param {string[]} to destination email addresses
   * @param {string} bodyStringInHTMLFormat body of email in HTML format, simple string accepted
   * @param {string} subject subject of email
   * @returns {Promise<boolean>} true if success, false if failed
   * @memberof Mailer
   */
  static async sendEmailToManyAddresses(
    to: string[],
    bodyStringInHTMLFormat: string,
    subject: string
  ): Promise<boolean> {
    try {
      return await this._MailService.send(to, bodyStringInHTMLFormat, subject);
    } catch (e) {
      logger.error(`Send mail to addresses: ${to.toString()} failed because ${e.message}`);
      return false;
    }
  }

  static sendVideoNotificationEmail(request: Request): Promise<boolean> {
    const to = request.buyer_email || request.user.email;
    const subject = VideoNotificationEmailSubjectBuilder(request);
    const body = VideoNotificationEmailBodyBuilder(request);

    return this.sendEmailToAnAddress(to, body, subject);
  }

  static sendRequestNotificationEmail(request: Request): Promise<boolean> {
    const to = request.buyer_email || request.user.email;
    const subject = RequestNotificationEmailSubjectBuilder(request.celeb.name);
    const body = RequestNotificationEmailBodyBuilder(request);

    return this.sendEmailToAnAddress(to, body, subject);
  }
}
export default Mailer;
