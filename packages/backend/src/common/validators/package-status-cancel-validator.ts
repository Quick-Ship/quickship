import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PackageStatusCancelEnum } from '../enums/package-status-cancelatio.enum';

@ValidatorConstraint({ name: 'status', async: true })
@Injectable()
export class StatusCancelValidator implements ValidatorConstraintInterface {
  validate(status: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    if (typeof status === 'number' && typeof relatedValue === 'number') {
      return !!PackageStatusCancelEnum[status];
    } else {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `El campo ${args.property} no es un estatus valido para cancel el paquete.`;
  }
}

export function IsCancelStatus(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCancelStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [propertyName],
      validator: StatusCancelValidator,
    });
  };
}
