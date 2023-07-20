import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { FilterableField, KeySet } from '@nestjs-query/query-graphql';

@ObjectType('Messenger')
@KeySet(['id'])
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
