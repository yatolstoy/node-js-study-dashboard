import { IsString } from 'class-validator';

export class LoginUserDto {
	@IsString({ message: 'Не указан логин' })
	login: string;
	@IsString({ message: 'Не указан пароль' })
	password: string;
}
