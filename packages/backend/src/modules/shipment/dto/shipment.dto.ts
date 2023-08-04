import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  KeySet,
  QueryOptions,
  PagingStrategies,
  FilterableCursorConnection,
  Relation,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

/*Local Imports */
import { MessengerDTO } from 'src/modules/messengers/dto/messenger.dto';
import { PackageDTO } from 'src/modules/packages/dto/packages.dto';
import { ShipmentStatusDTO } from 'src/modules/shipmet-status/dto/shipment-status.dto';
import { WarehouseShipmentDTO } from 'src/modules/warehouse-shipment/dto/warehouse-shipment.dto';

@ObjectType('Shipment')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 200,
  maxResultsSize: 500,
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
})
@FilterableCursorConnection('packages', () => PackageDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  nullable: true,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@Relation('warehouseShipment', () => WarehouseShipmentDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@Relation('shipmentStatus', () => ShipmentStatusDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@Relation('messenger', () => MessengerDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  nullable: true,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class ShipmentDTO {
  @Field()
  id!: number;

  @Field({ nullable: true })
  comments?: string;

  @Field({ defaultValue: 0 })
  price!: number;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
