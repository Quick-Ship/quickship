import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableCursorConnection,
  FilterableField,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { PackageDTO } from 'src/modules/packages/dto/packages.dto';
import { SortDirection } from '@nestjs-query/core';

@ObjectType('PackageStatus')
@KeySet(['id'])
@FilterableCursorConnection('package', () => PackageDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class PackageStatusDTO {
  @Field()
  id!: number;

  @FilterableField()
  status: string;

  @Field()
  description: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
