import { InputType } from '@nestjs/graphql';
import { InputCreateCourierActivityDTO } from './create-courier-activity.dto';

@InputType('InputUpdateCourierActivity')
export class InputUpdateCourierActivityDTO extends InputCreateCourierActivityDTO {}
