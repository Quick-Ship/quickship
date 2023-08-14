import { Field, InputType } from '@nestjs/graphql';
import { InputCreatePackageDTO } from './create-package.input';
import { IsDefined } from 'class-validator';

@InputType('InputCreatePackages')
export class InputCreatePackagesDTO {
  @Field(() => [InputCreatePackageDTO])
  @IsDefined()
  packages: InputCreatePackageDTO[];
}
