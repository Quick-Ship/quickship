import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsNumber, IsString } from 'class-validator';

@InputType('InputUpdateDirection')
export class InputUpdateDirectionDTO {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  street?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  neigthboorhood?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  municipality?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  state?: string;

  @Field({ nullable: true })
  @IsString()
  externalNumber?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  internalNumber?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  zipCode?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  longitude?: number;
}
