import { Router } from './router.js';
import { createServer } from 'http';
import { URL } from 'url';
import 'dotenv/config.js';

export class CustomServer {
  routes;
  PORT;
  users;
  constructor() {
    this.routes = [];
    this.PORT = process.env.PORT || '8000';
    this.start();
  }

  start() {
    createServer(async (request, response) => {
      response.setHeader('content-type', 'application/json');
      try {
        if (!request.url) {
          return;
        }
        const method = request.method || '';
        const baseURL = 'http://' + request.headers.host + request.url;
        const pathname = this.parseUrl(baseURL);
        const route = this.routes.find(r =>
          pathname === r.url && method === r.method);
        if (!route) {
          throw new Error({ message: 'Resource not found', statusCode: 404 });
        }
        const data = await route.callback(baseURL, request);
        response.writeHead(200);
        response.end(JSON.stringify({ result: data }));
        return;
      } catch (e) {
        const { statusCode, errorMessge } = this.handlerError(e);
        response.writeHead(statusCode);
        response.end(JSON.stringify({ result: errorMessge }));
      }
    })
      .listen(this.PORT, () => {
        console.log(`Server started at port: ${this.PORT}`);
      });
  }

  parseUrl(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.pathname;
  }

  get(url, conroller, method = 'GET') {
    const router = new Router(url, conroller.handle, method);
    this.routes.push(router);
  }

  post(url, callback) {
    this.get(url, callback, 'POST');
  }

  handlerError(error) {
    return { statusCode: error.statusCode || 500, errorMessge: error.message || 'Internal server error' };
  }
}