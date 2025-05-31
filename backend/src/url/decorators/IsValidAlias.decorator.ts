import { registerDecorator } from 'class-validator';

export function IsValidAlias(validationOptions?: any) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isValidAlias',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: string) {
					return /^[a-zA-Z0-9_-]+$/.test(value);
				},
				defaultMessage: () => 'alias может содержать только буквы, цифры, _ и -',
			},
		});
	};
}
