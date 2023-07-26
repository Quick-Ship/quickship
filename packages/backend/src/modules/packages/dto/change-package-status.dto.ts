import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InputCreateEvidenceDTO } from 'src/modules/evidences/dto/create-evidence.dto';

@InputType('InputChangeStatus')
class ChangeStatus {
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
  @Field(() => [ChangeStatus]!, { nullable: false })
  update: ChangeStatus[];
}
