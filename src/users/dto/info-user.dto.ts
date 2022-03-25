import { IsString } from 'class-validator';

export class InfoUserDto {
	@IsString({ message: 'Не указан логин' })
	login: string;
}
