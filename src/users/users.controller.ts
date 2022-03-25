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

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
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
		];
		this.bindRoutes(routes);
	}

	login(req: Request<{}, {}, LoginUserDto>, res: Response, next: NextFunction): void {
		next(new HTTPError('Ошибка авторизации', 401, 'login'));
	}

	async register(
		{ body }: Request<{}, {}, RegisterUserDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.create(body);
		if (!result) return next(new HTTPError('Такой пользователь уже существует', 433, 'Register'));
		this.ok(res, { login: result.login, id: result.id });
	}
}
