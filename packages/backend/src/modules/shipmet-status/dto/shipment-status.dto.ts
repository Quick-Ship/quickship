import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  CursorConnection,
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { SortDirection } from '@nestjs-query/core';

/*Local Imports */
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';

@ObjectType('ShipmentStatus')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 200,
  maxResultsSize: 500,
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
})
@CursorConnection('shipment', () => ShipmentDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class ShipmentStatusDTO {
  @Field()
  id!: number;

  @FilterableField()
  name!: string;

  @FilterableField()
  status!: string;

  @Field()
  description!: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
