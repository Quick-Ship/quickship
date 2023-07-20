import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNumber } from 'class-validator';

@InputType('InputAssignCourier')
export class InputAssignCourierDTO {
  @Field()
  @IsDefined()
  @IsNumber()
  courierId: number;

  @Field()
  @IsDefined()
  @IsNumber()
  shipmentId: number;
}
