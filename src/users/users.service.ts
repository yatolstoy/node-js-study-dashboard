import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
	async create({ login, name, password }: RegisterUserDto): Promise<User | null> {
		const user = new User(login, name);
		const salt = this.configService.get('SALT');
		await user.setPassword(password, salt);
		return user || null;
	}

	validate(dto: LoginUserDto): boolean {
		return false;
	}
}
