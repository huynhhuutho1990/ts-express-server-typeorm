import morgan from 'morgan';
import { Request, Response, Handler } from 'express';

const formatRequestLogger: morgan.FormatFn = (tokens, req, res) => {
  return JSON.stringify({
    response_time: tokens['response-time'](req, res),
    remote_addr: tokens['remote-addr'](req, res),
    remote_user: tokens['remote-user'](req, res),
    status: tokens['status'](req, res),
    url: tokens['url'](req, res),
    method: tokens['method'](req, res),
    type: 'request'
  });
};

const RequestLogger = (options?: morgan.Options<Request, Response>): Handler => {
  return morgan(formatRequestLogger, options);
};

export default RequestLogger;
