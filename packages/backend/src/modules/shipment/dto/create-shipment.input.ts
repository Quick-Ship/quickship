import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InputCreateDirectionDTO } from 'src/modules/directions/dto/create-direction.input';

@InputType('InputCreateShipment')
export class InputCreateShipmentDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  comments!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  clientId!: number;

  @Field(() => InputCreateDirectionDTO)
  direction: InputCreateDirectionDTO;
}
