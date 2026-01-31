import { Controller, Get, Param } from '@nestjs/common';
import { OrganisationUnitsService } from './organisation_units.service';

@Controller('organisation-units')
export class OrganisationUnitsController {
  constructor(
    private readonly organisationUnitsService: OrganisationUnitsService,
  ) {}

  // @Post()
  // create(@Body() createOrganisationUnitDto: CreateOrganisationUnitDto) {
  //   return this.organisationUnitsService.create(createOrganisationUnitDto);
  // }

  @Get()
  findAll() {
    return this.organisationUnitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organisationUnitsService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOrganisationUnitDto: UpdateOrganisationUnitDto,
  // ) {
  //   return this.organisationUnitsService.update(+id, updateOrganisationUnitDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.organisationUnitsService.remove(+id);
  // }
}
