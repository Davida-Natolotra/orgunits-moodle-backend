import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganisationUnitDto } from './create-organisation_unit.dto';

export class UpdateOrganisationUnitDto extends PartialType(CreateOrganisationUnitDto) {}
