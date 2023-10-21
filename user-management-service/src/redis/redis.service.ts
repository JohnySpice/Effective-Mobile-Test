import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { IHistoryRecord } from 'src/interfaces/history-record.interface';

@Injectable()
export class RedisService extends Redis {
  private channel = 'user-changes';

  async pub(data: IHistoryRecord) {
    await super.publish(this.channel, JSON.stringify(data));
  }
}
