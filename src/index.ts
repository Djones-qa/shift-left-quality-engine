import { createServer } from './api/server';
import { logger } from './config';

const command = process.argv[2];

if (command === 'serve') {
  const { start } = createServer();
  start();
} else {
  logger.info('Shift-Left Quality Engine');
  logger.info('Usage: shift-left-quality-engine serve');
  logger.info('  serve  - Start the API server');
}
