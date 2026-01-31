import { Module } from '@nestjs/common';
import { OrganisationUnitsService } from './organisation_units.service';
import { OrganisationUnitsController } from './organisation_units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationUnit } from './entities/organisation_unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationUnit])],
  controllers: [OrganisationUnitsController],
  providers: [OrganisationUnitsService],
})
export class OrganisationUnitsModule {}
