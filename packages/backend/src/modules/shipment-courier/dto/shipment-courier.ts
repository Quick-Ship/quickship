import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType('ShipmentCourier')
// @KeySet(['id'])
@QueryOptions({
  defaultResultSize: 200,
  maxResultsSize: 500,
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
})
export class ShipmentCourierDTO {
  @Field()
  id!: number;

  @Field()
  shipmentId: number;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
