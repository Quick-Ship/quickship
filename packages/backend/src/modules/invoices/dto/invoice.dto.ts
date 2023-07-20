import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { FilterableField, KeySet } from '@nestjs-query/query-graphql';

@ObjectType('Invoice')
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
