import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { IUserService } from './user.service.interface';
import { UserService } from './users.service';
import { UserModel } from 'prisma/prisma-client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UserRepositoryMock: IUserRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let userRepository: IUserRepository;
let userService: IUserService;

// Выполняется перед запуском всех тестов
beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(UserRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	userRepository = container.get<IUserRepository>(TYPES.UserRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

// Описывает что тестируем
describe('User Service', () => {
	//Конкретный тест
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		userRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: 'Вася',
				login: user.login,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await userService.createUser({
			login: 'a@a.ru',
			name: 'Вася',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});

	it('validateUser same password', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const validateUser = await userService.validateUser({
			login: 'a@a.ru',
			password: '1',
		});
		expect(validateUser).toEqual(true);
	});

	it('validateUser not the same password', async () => {
		userRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const validateUser = await userService.validateUser({
			login: 'a@a.ru',
			password: '123',
		});
		expect(validateUser).toEqual(false);
	});

	it('validateUser no user', async () => {
		userRepository.find = jest.fn().mockReturnValue(null);
		const validateUser = await userService.validateUser({
			login: 'a@a.ru',
			password: '123',
		});
		expect(validateUser).toEqual(false);
	});
});

function UserModel(arg0: {}): any {
	throw new Error('Function not implemented.');
}
// Выполняется после всех тестов
// afterAll(() => {});
