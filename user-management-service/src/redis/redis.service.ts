import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { IHistoryRecord } from 'src/interfaces/history-record.interface';
import 'dotenv/config';

@Injectable()
export class RedisService extends Redis {
  private channel = 'user-changes';
  constructor() {
    super(parseInt(process.env.REDIS_PORT), process.env.REDIS_HOST);
  }
  async pub(data: IHistoryRecord) {
    await super.publish(this.channel, JSON.stringify(data));
  }
}
