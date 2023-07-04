import { Field, GraphQLISODateTime, ObjectType, ID } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';

@ObjectType('invoice')
@KeySet(['id'])
export class InvoiceDTO {
  @Field()
  id!: number;

  @Field()
  socialReazon!: string;

  @FilterableField()
  rfc!: string;

  @Field()
  street!: string;

  @Field()
  neigthboorhood!: string;

  @Field()
  municipality!: string;

  @Field()
  state!: string;

  @Field()
  externalNumber!: number;

  @Field()
  internalNumber?: number;

  @FilterableField()
  zipCode!: number;

  @Field()
  taxRegimen!: number;

  @Field()
  cfdi!: string;

  @FilterableField(() => GraphQLISODateTime)
  createAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updateAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
