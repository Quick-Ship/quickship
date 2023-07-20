import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  KeySet,
  QueryOptions,
  PagingStrategies,
  Relation,
  CursorConnection,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ClientDTO } from 'src/modules/client/dto/client.dto';

/*Local Imports */
import { ContactDTO } from 'src/modules/contact/dto/contact.dto';
import { DirectionDTO } from 'src/modules/directions/dto/directions.dto';
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';

@ObjectType('WarehouseShipment')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 200,
  maxResultsSize: 500,
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
})
@Relation('contact', () => ContactDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@Relation('direction', () => DirectionDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@Relation('client', () => ClientDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@CursorConnection('shipment', () => ShipmentDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class WarehouseShipmentDTO {
  @Field()
  id!: number;

  @Field({ nullable: true })
  instructions?: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
