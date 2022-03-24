import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';

export interface IUserService {
	create: (dto: RegisterUserDto) => Promise<User | null>;
	validate: (dto: LoginUserDto) => boolean;
}
