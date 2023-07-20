import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { InputUpdateDirectionDTO } from 'src/modules/directions/dto/update-direction.input';
import { InputUpdateContactDTO } from 'src/modules/contact/dto/update-contact.input';

@InputType('InputUpdateWarehouseShipment')
export class InputUpdateWarehouseShipmentDTO {
  @Field()
  @IsString()
  @IsOptional()
  instructions?: string;

  @Field(() => InputUpdateDirectionDTO)
  direction?: InputUpdateDirectionDTO;

  @Field(() => InputUpdateContactDTO)
  contact?: InputUpdateContactDTO;
}
