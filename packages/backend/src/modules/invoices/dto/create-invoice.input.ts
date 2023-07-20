import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType('InputCreateInvoice')
export class InputCreateInvoiceDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  socialReazon: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  rfc: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  street: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  neigthboorhood: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  municipality: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  state: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  externalNumber: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  internalNumber: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  zipCode: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  taxRegimen: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  cfdi: string;
}
