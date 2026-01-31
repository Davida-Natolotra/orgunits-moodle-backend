import { PrimaryColumn, Column, Entity, JoinColumn } from 'typeorm';

@Entity({ name: 'organisation_units' })
export class OrganisationUnit {
  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column('varchar', { length: 255, nullable: true })
  shortName: string | null;

  @Column('varchar', { length: 255, nullable: true })
  name: string | null;

  @Column('text', { nullable: true })
  path: string | null;

  @Column('int', { nullable: true })
  level: number | null;

  @Column('date', { nullable: true })
  openingDate: Date | null;

  @Column('date', { nullable: true })
  closedDate: Date | null;

  @Column('varchar', { length: 255, nullable: true })
  created: Date;

  @Column('varchar', { length: 255, nullable: true })
  lastUpdated: Date;

  @Column('varchar', { length: 255, nullable: true })
  createdBy: string | null;

  @Column('varchar', { length: 255, nullable: true })
  lastUpdatedBy: string | null;

  // Self-referencing relationship (parent organisation unit)
  @Column('varchar', { length: 255, nullable: true })
  parent_id: string | null;

  @JoinColumn({ name: 'parent_id' })
  parent: OrganisationUnit | null;

  // // Optional: if you want to easily access children
  // children?: OrgUnit[];

  // PostgreSQL JSONB columns
  @Column('varchar', { length: 255, nullable: true })
  attributeValues: any; // You can create an interface for strongly typing this

  @Column('varchar', { length: 255, nullable: true })
  translations: any;
}
