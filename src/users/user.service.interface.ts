import { UserModel } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

export interface IUserService {
	createUser: (dto: RegisterUserDto) => Promise<UserModel | null>;
	validateUser: (dto: LoginUserDto) => Promise<boolean>;
	getUserInfo: (login: string) => Promise<UserModel | null>;
}
