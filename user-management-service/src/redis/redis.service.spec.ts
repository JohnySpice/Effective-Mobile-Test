import { Test, TestingModule } from '@nestjs/testing';
import { _RedisService } from './redis.service';

describe('RedisService', () => {
  let service: _RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [_RedisService],
    }).compile();

    service = module.get<_RedisService>(_RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
