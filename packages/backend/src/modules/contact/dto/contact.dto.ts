import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  CursorConnection,
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { PackageDTO } from 'src/modules/packages/dto/packages.dto';
import { SortDirection } from '@nestjs-query/core';
import { WarehouseShipmentDTO } from 'src/modules/warehouse-shipment/dto/warehouse-shipment.dto';

@ObjectType('Contact')
@KeySet(['id'])
@FilterableRelation('packages', () => PackageDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@CursorConnection('warehouseShipment', () => WarehouseShipmentDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class ContactDTO {
  @Field()
  id!: number;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  phone!: string;

  @FilterableField()
  email!: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
