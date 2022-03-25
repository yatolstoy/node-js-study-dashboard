import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}
	async create({ login, name, password }: RegisterUserDto): Promise<UserModel | null> {
		const user = new User(login, name);
		const salt = this.configService.get('SALT');
		await user.setPassword(password, salt);
		const isUserExist = await this.userRepository.find(user);
		if (isUserExist) {
			return null;
		}
		return this.userRepository.create(user);
	}

	validate(dto: LoginUserDto): boolean {
		return false;
	}
}
