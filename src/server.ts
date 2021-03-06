import { HOST, PORT } from './config';
import app from './app';
import logger from './common/logger';
import v8 from 'v8';
import { createConnection } from 'typeorm';
import rdbms from './config/rdbms'; // config file for typeorm
import { validateEnv } from './utils/helpers/validation.helper';

validateEnv();

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  logger.error(e);
  process.exit(1);
});

(async () => {
  // let connection: any;
  try {
    await createConnection(rdbms);
    logger.info('Database connected');
  } catch (error) {
    logger.error('Error while connecting to the database', error);
    process.exit(1);
  }

  const server = app
    .listen(PORT, () => {
      logger.info(`Running on port: http://${HOST}:${PORT}`);
    })
    .on('error', (e) => logger.error(e));

  logger.info({
    currentMemory: v8.getHeapStatistics().total_available_size / 1024 / 1024
  });

  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
})();
