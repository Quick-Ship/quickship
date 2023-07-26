import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';

@ObjectType('Messenger')
@KeySet(['id'])
@QueryOptions({
  defaultResultSize: 100,
  maxResultsSize: 500,
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true
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
