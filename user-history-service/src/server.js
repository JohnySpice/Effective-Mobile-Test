import { Router } from './router.js';
import { createServer } from 'http';
import { URL } from 'url';
import {
  ResourceNotFoundError,
  InternalError,
  CustomError,
} from './errors/index.js';

export class CustomServer {
  routes;
  PORT;
  users;
  constructor() {
    this.routes = [];
    this.PORT = process.env.PORT_UH || '8010';
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
        const route = this.routes.find(
          (r) => pathname === r.url && method === r.method,
        );
        if (!route) {
          throw new ResourceNotFoundError();
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
    }).listen(this.PORT, () => {
      console.log(`Server started at port: ${this.PORT}`);
    });
  }

  parseUrl(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.pathname;
  }

  get(url, conroller, method = 'GET') {
    const router = new Router(url, conroller.handle.bind(conroller), method);
    this.routes.push(router);
  }

  post(url, callback) {
    this.get(url, callback, 'POST');
  }

  handlerError(error) {
    if (error instanceof CustomError) {
      return { statusCode: error.statusCode, errorMessge: error.message };
    } else {
      return {
        statusCode: InternalError.statusCode,
        errorMessge: InternalError.message,
      };
    }
  }
}
