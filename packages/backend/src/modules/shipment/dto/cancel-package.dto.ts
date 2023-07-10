import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNumber } from 'class-validator';
import { InputEvidence } from './close-package.dto';
import { IsCancelStatus } from 'src/common/validators/package-status-cancel-validator';

@InputType('InputCancelPackage')
export class InputCancelPackageDTO {
  @Field()
  @IsDefined()
  @IsNumber()
  shipmentId: number;

  @Field()
  @IsDefined()
  @IsNumber()
  packageId: number;

  @Field()
  @IsCancelStatus()
  statusCancelation?: number;

  @Field(() => InputEvidence)
  @IsDefined()
  evidence: InputEvidence;
}
