import { CustomServer } from './server.js';
import userHistoryController from './controllers/user-history.controller.js';
import dataSource from './db/data-source.js';

function start() {
  dataSource.initialize();
  const server = new CustomServer();
  server.get('/users-history', userHistoryController);
}

start();
