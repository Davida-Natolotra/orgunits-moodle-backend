import { Test, TestingModule } from '@nestjs/testing';
import { MdlService } from './mdl.service';

describe('MdlService', () => {
  let service: MdlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MdlService],
    }).compile();

    service = module.get<MdlService>(MdlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
