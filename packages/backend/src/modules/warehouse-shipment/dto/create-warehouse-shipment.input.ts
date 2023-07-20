import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InputCreateContactDTO } from 'src/modules/contact/dto/create-contact.input';
import { InputCreateDirectionDTO } from 'src/modules/directions/dto/create-direction.input';

@InputType('InputCreateWarehouseShipment')
export class InputCreateWarehouseShipmentDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  instructions!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  clientId!: number;

  @Field(() => InputCreateDirectionDTO)
  direction: InputCreateDirectionDTO;

  @Field(() => InputCreateContactDTO)
  contact: InputCreateContactDTO;
}
