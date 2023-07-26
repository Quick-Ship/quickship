import { InputType } from '@nestjs/graphql';
import { InputCreateClientDTO } from 'src/modules/client/dto/create-client.input';

@InputType('InputRegisterCourier')
export class InputRegisterCourierDTO extends InputCreateClientDTO {}
