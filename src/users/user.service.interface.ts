import { UserModel } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

export interface IUserService {
	create: (dto: RegisterUserDto) => Promise<UserModel | null>;
	validate: (dto: LoginUserDto) => Promise<boolean>;
}
