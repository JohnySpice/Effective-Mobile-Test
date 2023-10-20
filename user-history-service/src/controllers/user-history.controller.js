import { findAll } from '../services/user-history.service.js';
import querystring from 'querystring';
import { URL } from 'url';
import { validate } from 'uuid';
import { InvalidIdError } from '../errors/index.js';

class HistoryController {
  async handle(baseUrl, requestData) {
    const url = new URL(baseUrl);
    const params = querystring.parse(url.searchParams.toString());
    if (params.id && !validate(params.id)) {
      throw new InvalidIdError();
    }
    return this.getHistory(params);
  }
  async getHistory(queryParams) {
    return findAll(queryParams);
  }
}

export default new HistoryController();