import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
  Relation,
} from '@nestjs-query/query-graphql';
import { CourierActivityDTO } from 'src/modules/courier-activity/dtos/courier-activity.dto';
import { SortDirection } from '@nestjs-query/core';

@ObjectType('Messenger')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 100,
  maxResultsSize: 500,
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true
})
@Relation('courierActivity', () => CourierActivityDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class MessengerDTO {
  @Field()
  id!: number;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @FilterableField()
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
