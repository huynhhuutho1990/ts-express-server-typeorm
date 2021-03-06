import SES from 'aws-sdk/clients/ses';
import IMailService from '../../interface/mail.service';
import { SOURCE_EMAIL_ADDRESS } from '../../../../../config';
import MailParams from '../../interface/mail.params';

class MailService implements IMailService {
  async send(to: string[], body: string, subject: string): Promise<boolean> {
    const mailParams = new MailParams(to, body, subject);

    const params = SESImpl.paramsBuilder(mailParams);
    const result = await SESImpl.sendEmail(params);

    return result.MessageId ? true : false;
  }
}

class SESImpl {
  private static readonly _SESClient: SES = new SES({
    region: 'ap-south-1',
    apiVersion: '2010-12-01'
  });

  static sendEmail(params: SES.Types.SendEmailRequest) {
    return this._SESClient.sendEmail(params).promise();
  }

  static paramsBuilder(mailParams: MailParams): SES.Types.SendEmailRequest {
    const CcAddresses: string[] = [];
    const ReplyToAddresses: string[] = [];

    const params = {
      Destination: {
        CcAddresses,
        ToAddresses: mailParams.toAddresses
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: mailParams.body
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: mailParams.subject
        }
      },
      Source: SOURCE_EMAIL_ADDRESS,
      ReplyToAddresses
    };

    return params;
  }
}

export default MailService;
