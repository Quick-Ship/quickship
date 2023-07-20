import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  CursorConnection,
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';
import { SortDirection } from '@nestjs-query/core';
import { PackageDTO } from 'src/modules/packages/dto/packages.dto';
import { WarehouseShipmentDTO } from 'src/modules/warehouse-shipment/dto/warehouse-shipment.dto';

@ObjectType('Direction')
@KeySet(['id'])
@FilterableRelation('shipment', () => ShipmentDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@FilterableRelation('package', () => PackageDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@CursorConnection('warehouseShipment', () => WarehouseShipmentDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class DirectionDTO {
  @Field()
  id!: number;

  @Field()
  street!: string;

  @Field()
  neigthboorhood!: string;

  @Field()
  municipality!: string;

  @Field()
  state!: string;

  @Field()
  externalNumber!: string;

  @Field()
  internalNumber?: string;

  @FilterableField()
  zipCode!: string;

  @Field()
  latitude!: number;

  @Field()
  longitude!: number;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
