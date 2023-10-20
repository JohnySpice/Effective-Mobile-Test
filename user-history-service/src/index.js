import { CustomServer } from './server.js';
import userHistoryController from './controllers/user-history.controller.js';

function start() {
  const server = new CustomServer();
  server.get('/users', userHistoryController);
}

start();