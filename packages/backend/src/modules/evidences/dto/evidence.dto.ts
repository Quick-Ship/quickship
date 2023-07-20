import { SortDirection } from '@nestjs-query/core';
import {
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

/*Local Imports */
import { PackageDTO } from 'src/modules/packages/dto/packages.dto';

@ObjectType('Evidence')
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
export class EvidenceDTO {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  personReceived: string;

  @Field({ nullable: true })
  @IsString()
  comments?: string;

  @Field()
  @IsString()
  url: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
