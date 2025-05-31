import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsFutureDate(validationOptions?: any) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isFutureDate',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (!value) return true; // пропускаем, если не задано
					return value instanceof Date && value > new Date();
				},
				defaultMessage: () => 'Дата окончания действия ссылки должна быть в будущем.',
			},
		});
	};
}
