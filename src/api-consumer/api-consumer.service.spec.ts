import { Test, TestingModule } from '@nestjs/testing';
import { ApiConsumerService } from './api-consumer.service';

describe('ApiConsumerService', () => {
  let service: ApiConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiConsumerService],
    }).compile();

    service = module.get<ApiConsumerService>(ApiConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
