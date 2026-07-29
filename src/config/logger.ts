import winston from 'winston';
import { DEFAULT_LOG_LEVEL } from './defaults';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'shift-left-quality-engine' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

export default logger;
