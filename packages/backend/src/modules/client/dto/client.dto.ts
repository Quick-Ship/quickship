import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateOne,
  CreateOneInputType,
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { PackageDTO } from 'src/modules/packages/dto/packages.dto';
import { SortDirection } from '@nestjs-query/core';
import { ExecutionContext } from '@nestjs/common';

@ObjectType('Client')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 100,
  maxResultsSize: 500,
  pagingStrategy: PagingStrategies.OFFSET,
})
@FilterableRelation('packages', () => PackageDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
// @BeforeCreateOne((input: CreateOneInputType<ClientDTO>, context) => {
//   input.input.createdBy = context.;
//   return input;
// })
export class ClientDTO {
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
