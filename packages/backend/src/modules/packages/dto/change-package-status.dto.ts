import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InputCreateEvidenceDTO } from 'src/modules/evidences/dto/create-evidence.dto';

@InputType('InputChangeStatus')
export class InputChangeStatus {
  @Field()
  @IsString()
  @IsNotEmpty()
  guide: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  statusId: number;

  @Field(() => InputCreateEvidenceDTO, { nullable: true })
  evidence?: InputCreateEvidenceDTO;
}
@InputType('InputChangePackageStatus')
export class InputChangePackageStatusDTO {
  @Field(() => [InputChangeStatus]!, { nullable: false })
  update: InputChangeStatus[];
}
