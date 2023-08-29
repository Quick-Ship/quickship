import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType('InputUpdateShipmentCourier')
export class UpdateShipmentCourierInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  shipmentId: number;
}
