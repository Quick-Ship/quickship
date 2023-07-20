import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { InputCreateContactDTO } from 'src/modules/contact/dto/create-contact.input';
import { InputCreateDirectionDTO } from 'src/modules/directions/dto/create-direction.input';

@InputType('InputCreatePackage')
export class InputCreatePackageDTO {
  @Field({ defaultValue: 1.0 })
  @IsNumber()
  @IsNotEmpty()
  weigth!: number;

  @Field({ defaultValue: 1.0 })
  @IsNumber()
  @IsNotEmpty()
  width!: number;

  @Field({ defaultValue: 1.0 })
  @IsNumber()
  @IsNotEmpty()
  heigth!: number;

  @Field({ defaultValue: 1.0 })
  @IsNumber()
  @IsNotEmpty()
  length!: number;

  @Field()
  @IsString()
  @IsOptional()
  guide?: string;

  @Field(() => InputCreateContactDTO, { nullable: false })
  contact: InputCreateContactDTO;

  @Field(() => InputCreateDirectionDTO, { nullable: false })
  direction: InputCreateDirectionDTO;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  idClient: number;
}
