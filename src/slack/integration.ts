import { WebClient } from '@slack/client';
import { environment, SLACK_INFO } from '../config';

const token = SLACK_INFO.TOKEN;

const slackClient = new WebClient(token);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const postMessageToSlack = async (channel_id: string, error: Error, req: any): Promise<any> => {
  try {
    const attachments = [
      {
        color: '#FF0000',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: error.message,
              emoji: true
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '```' + error.stack + '```'
            }
          },
          {
            type: 'divider'
          }
        ]
      }
    ];

    const keys = ['url', 'method', 'body', 'headers', 'ip'];
    keys.forEach((element) => {
      const field: any = {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${element.toUpperCase()}*: \`\`\` ${JSON.stringify(req[element], null, '\t')} \`\`\``
        }
      };
      attachments[0].blocks.push(field);
    });
    const res = await slackClient.chat.postMessage({
      channel: channel_id,
      text: '',
      attachments: attachments,
      username: 'Server NodeJS ' + environment.toUpperCase()
    });
    return res;
  } catch (error) {
    return error;
  }
};
