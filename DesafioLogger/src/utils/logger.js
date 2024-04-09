import { NODE_ENV } from '../config/config.js';
import winston from 'winston';
const { createLogger, format, transports } = winston;


const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

const logFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack || ''}`;
  })
);

const developmentLogger = createLogger({
  levels,
  format: logFormat,
  transports: [new transports.Console()],
});

const productionLogger = createLogger({
  levels,
  format: logFormat,
  transports: [
    new transports.Console({
      level: 'info',
    }),
    new transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});

function getLogger() {
  if (process.env.NODE_ENV === 'production') {
    return productionLogger;
  } else {
    return developmentLogger;
  }
}

export const logger = getLogger();

