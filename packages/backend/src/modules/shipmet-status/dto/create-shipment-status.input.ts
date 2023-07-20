import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('InputCreateShipmentStatus')
export class InputCreateShipmentStatusDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  status!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description!: string;
}
