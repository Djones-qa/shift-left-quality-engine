import dotenv from 'dotenv';
import {
  DEFAULT_PORT,
  DEFAULT_MAX_COMPLEXITY,
  DEFAULT_ENABLE_SECURITY,
  DEFAULT_NODE_ENV,
  DEFAULT_LOG_LEVEL,
} from './defaults';

dotenv.config();

export interface AppConfig {
  port: number;
  nodeEnv: string;
  logLevel: string;
  maxComplexity: number;
  enableSecurity: boolean;
}

export function loadConfig(): AppConfig {
  return {
    port: parseInt(process.env.PORT || String(DEFAULT_PORT), 10),
    nodeEnv: process.env.NODE_ENV || DEFAULT_NODE_ENV,
    logLevel: process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL,
    maxComplexity: parseInt(process.env.MAX_COMPLEXITY || String(DEFAULT_MAX_COMPLEXITY), 10),
    enableSecurity: process.env.ENABLE_SECURITY !== 'false' && DEFAULT_ENABLE_SECURITY,
  };
}
