import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType('InputGenerateShipment')
export class InputGenerateShipmentDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  comments!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  clientId!: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  warehouseShipmentId: number;
}
