import { CustomServer } from './server.js';
import userHistoryController from './controllers/user-history.controller.js';
import dataSource from './db/data-source.js';
import { initializeRedis } from './redis/redis.service.js';

function start() {
  dataSource.initialize();
  initializeRedis();
  const server = new CustomServer();
  server.get('/users-history', userHistoryController);
}

start();
