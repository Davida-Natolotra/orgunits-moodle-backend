import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganisationUnit } from './entities/organisation_unit.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class OrganisationUnitsService {
  // create(createOrganisationUnitDto: CreateOrganisationUnitDto) {
  //   return 'This action adds a new organisationUnit';
  // }

  constructor(
    @InjectRepository(OrganisationUnit)
    private organisationUnitsRepo: Repository<OrganisationUnit>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  findAll() {
    return this.organisationUnitsRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} organisationUnit`;
  }

  // update(id: number, updateOrganisationUnitDto: UpdateOrganisationUnitDto) {
  //   return `This action updates a #${id} organisationUnit`;
  // }

  remove(id: number) {
    return `This action removes a #${id} organisationUnit`;
  }
}
