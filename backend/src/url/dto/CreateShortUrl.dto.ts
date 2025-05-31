import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsValidAlias } from '../decorators/IsValidAlias.decorator';
import { IsFutureDate } from '../decorators/IsFutureDate.decorator';

export class CreateShortUrlDto {
	@IsString({ message: 'originalUrl должен быть строкой' })
	@IsNotEmpty({ message: 'originalUrl не должен быть пустым' })
	@IsUrl({}, { message: 'originalUrl должен быть корректным URL' })
	originalUrl: string;

	@IsOptional()
	@Transform(({ value }) => {
		if (!value) return undefined;
		const date = new Date(value);
		return isNaN(date.getTime()) ? undefined : date;
	})
	@IsDate({ message: 'expiresAt должен быть корректной датой' })
	@IsFutureDate({ message: 'expiresAt должна быть в будущем' })
	expiresAt: Date;

	@IsOptional()
	@IsString({ message: 'alias должен быть строкой' })
	@MaxLength(20, { message: 'alias не должен быть длиннее 20 символов' })
	@IsValidAlias({ message: 'alias может содержать только буквы, цифры, _ и -' })
	alias: string;
}
