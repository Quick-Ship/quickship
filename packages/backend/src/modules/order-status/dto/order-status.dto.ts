import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { OrderDto } from 'src/modules/orders/dto/orders.dto';

@ObjectType('orderStatus')
export class OrderStatusDto {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field((type) => OrderDto, { nullable: true })
  orders: OrderDto[];

  @Field(() => GraphQLISODateTime)
  createAt!: Date;

  @Field(() => GraphQLISODateTime)
  updateAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  deleteAt?: Date;
}
