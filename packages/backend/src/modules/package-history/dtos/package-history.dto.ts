import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { SortDirection } from '@nestjs-query/core';

@ObjectType('PackageHistory')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 100,
  maxResultsSize: 200,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class PackageHistoryDTO {
  @Field()
  id!: number;

  @FilterableField()
  status: string;

  @FilterableField()
  idPackage: number;

  @Field()
  description: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
