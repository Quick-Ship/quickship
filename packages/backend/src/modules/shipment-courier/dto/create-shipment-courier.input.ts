import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('InputCreateShipmentCourier')
export class CreateShipmentCourierInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  shipmentId: number;
}
