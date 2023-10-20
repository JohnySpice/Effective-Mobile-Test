/**
 * @class
 * @param
 */
export class Router {
  url;
  callback;
  method;
  /**
   * Create a point.
   * @param {string} url - endpoint.
   * @param {function} callback - request handler.
   * @param {string} method - 'POST' | 'GET' | 'PUT' | 'DELETE' etc.;
   */
  constructor(url, callback, method) {
    this.url = url;
    this.callback = callback;
    this.method = method;
  }
}
