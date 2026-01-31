import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationUnitsService } from './organisation_units.service';

describe('OrganisationUnitsService', () => {
  let service: OrganisationUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationUnitsService],
    }).compile();

    service = module.get<OrganisationUnitsService>(OrganisationUnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
