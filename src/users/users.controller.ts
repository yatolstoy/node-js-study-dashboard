import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/HttpError.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserController } from './user.interface';
import 'reflect-metadata';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { IUserService } from './user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';
import { InfoUserDto } from './dto/info-user.dto';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		4;
		const routes: IControllerRoute[] = [
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(LoginUserDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(RegisterUserDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		];
		this.bindRoutes(routes);
	}

	async login(
		{ body }: Request<{}, {}, LoginUserDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const userValidate = await this.userService.validateUser(body);
		if (!userValidate) {
			next(new HTTPError('Ошибка авторизации', 401, 'login'));
			return;
		}
		const jwt = await this.signJWTToken(body.login);
		this.ok(res, { jwt });
	}

	async register(
		{ body }: Request<{}, {}, RegisterUserDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) return next(new HTTPError('Такой пользователь уже существует', 433, 'Register'));
		this.ok(res, { login: result.login, id: result.id });
	}

	async info(
		{ body }: Request<{}, {}, InfoUserDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.getUserInfo(body);
		this.ok(res, { login: result?.login, id: result?.id });
	}

	async signJWTToken(login: string): Promise<string> {
		const key = this.configService.get('JWT-KEY');
		return await sign({ login, iat: Math.ceil(Date.now() / 1000) }, key, { algorithm: 'HS256' });
	}
}
