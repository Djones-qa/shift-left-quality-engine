import express from 'express';
import cors from 'cors';
import { loadConfig, logger } from '../config';

export function createServer() {
  const app = express();
  const config = loadConfig();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'healthy',
      service: 'shift-left-quality-engine',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  });

  const start = () => {
    app.listen(config.port, () => {
      logger.info(`Shift-Left Quality Engine running on port ${config.port}`);
    });
  };

  return { app, start };
}
