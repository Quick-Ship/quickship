import { ObjectType } from '@nestjs/graphql';
import { RegisterClientResponseDTO } from 'src/modules/client/dto/register-client-dto';

@ObjectType('ResponseRegisterCourier')
export class ResponseRegisterCourierDTO extends RegisterClientResponseDTO {}
