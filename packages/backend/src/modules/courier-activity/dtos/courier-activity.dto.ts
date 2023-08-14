import { SortDirection } from '@nestjs-query/core';
import {
  CursorConnection,
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { MessengerDTO } from 'src/modules/messengers/dto/messenger.dto';

@ObjectType('CourierActivity')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 200,
  maxResultsSize: 500,
  enableTotalCount: true,
  pagingStrategy: PagingStrategies.OFFSET,
})
@CursorConnection('messenger', () => MessengerDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class CourierActivityDTO {
  @Field()
  id!: number;

  @FilterableField()
  name!: string;

  @Field()
  description!: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
