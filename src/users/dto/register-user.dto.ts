import { IsString } from 'class-validator';

export class RegisterUserDto {
	@IsString({ message: 'Не указан логин' })
	login: string;
	@IsString({ message: 'Не указан пароль' })
	password: string;
	@IsString({ message: 'Не указано имя' })
	name: string;
}
