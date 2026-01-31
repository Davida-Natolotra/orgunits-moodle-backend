import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationUnitsController } from './organisation_units.controller';
import { OrganisationUnitsService } from './organisation_units.service';

describe('OrganisationUnitsController', () => {
  let controller: OrganisationUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationUnitsController],
      providers: [OrganisationUnitsService],
    }).compile();

    controller = module.get<OrganisationUnitsController>(
      OrganisationUnitsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
