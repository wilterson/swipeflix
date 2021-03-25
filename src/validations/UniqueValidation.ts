import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository, Not } from 'typeorm';

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint
  implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const entity = args.object[`class_entity_${args.property}`];
    const req_id = args.object['id'] || -1;
    const items = await getRepository(entity).findAndCount({
      [args.property]: value,
      id: Not(req_id),
    });
    return !items[1];
  }
}

export function UniqueOnDatabase(
  entity: Function,
  validationOptions?: ValidationOptions,
) {
  validationOptions = {
    ...{ message: 'This field is already in use. Choose another.' },
    ...validationOptions,
  };
  return function (object: Object, propertyName: string) {
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
}
