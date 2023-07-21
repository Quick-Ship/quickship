import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsArray,
  IsString,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';

@InputType('InputAddPackageShipment')
export class InputAddPackageShipmentDTO {
  @Field()
  @IsDefined()
  @IsNumber()
  shipmentId: number;

  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @Field(() => [String])
  guides: string[];
}
