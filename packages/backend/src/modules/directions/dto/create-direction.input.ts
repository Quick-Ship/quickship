import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('InputCreateDirection')
export class InputCreateDirectionDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  street!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  neigthboorhood!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  municipality!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  state!: string;

  @Field({ nullable: false })
  @IsString()
  @IsNotEmpty()
  externalNumber!: string;

  @Field({ nullable: true, defaultValue: 0 })
  @IsString()
  @IsOptional()
  internalNumber?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  zipCode!: string;

  @Field({ nullable: true, defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @Field({ nullable: true, defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  longitude?: number;
}
