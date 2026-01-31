import { Test, TestingModule } from '@nestjs/testing';
import { MdlController } from './mdl.controller';
import { MdlService } from './mdl.service';

describe('MdlController', () => {
  let controller: MdlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MdlController],
      providers: [MdlService],
    }).compile();

    controller = module.get<MdlController>(MdlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
