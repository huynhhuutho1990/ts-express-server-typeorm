import { createLogger, transports, format } from 'winston';
import { environment } from '../config';

const logLevel = environment === 'development' ? 'debug' : 'info';

export default createLogger({
  level: logLevel,
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        environment === 'development' ? format.prettyPrint() : format.splat()
      )
    })
  ],
  exitOnError: false // do not exit on handled exceptions
});
