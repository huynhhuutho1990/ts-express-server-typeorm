import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import logger from './common/logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import { environment, SLACK_INFO } from './config';
import helmet from 'helmet';
import compression from 'compression';
import { NotFoundError, ApiError, InternalError } from './common/api-error';
import apiV1 from './api/v1';
import RequestLogger from './common/requestLogger';
import { postMessageToSlack } from './slack/integration';

const app = express();

/**
 * Enable running express behind proxy
 */
app.enable('trust proxy');

/**
 * Adds security middleware to app
 */
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard());
app.use(helmet.hsts());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

/**
 * Adds desired middleware to app
 */
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(compression());

// Endpoint for Health check
app.get('/health-check', (req, res) => {
  res.status(200).end();
});

/**
 * Request logger
 */
app.use(RequestLogger());

// Routes
app.use('/v1', apiV1);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({
    message: err.message,
    stack: err.stack
  });
  if (err instanceof ApiError) {
    ApiError.handle(err, req, res);
  } else {
    if (environment === 'development') {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), req, res);
  }
  if (res.statusCode === 404) {
    postMessageToSlack(SLACK_INFO.CHANNEL_404, err, req);
  } else {
    postMessageToSlack(SLACK_INFO.CHANNEL_500, err, req);
  }
});

export default app;
