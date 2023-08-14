import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';

/*Local Imports */
import { SortDirection } from '@nestjs-query/core';

@ObjectType('User')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 100,
  maxResultsSize: 500,
  pagingStrategy: PagingStrategies.OFFSET,
  defaultSort: [{ direction: SortDirection.DESC, field: 'createdAt' }],
  enableTotalCount: true
})
export class UserDTO {
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
