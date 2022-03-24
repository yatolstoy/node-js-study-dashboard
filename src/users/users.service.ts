import { injectable } from 'inversify';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	async create({ login, name, password }: RegisterUserDto): Promise<User | null> {
		const user = new User(login, name);
		await user.setPassword(password);
		return null;
	}

	validate(dto: LoginUserDto): boolean {
		return false;
	}
}
