import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/HttpError.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserController } from './user.interface';
import 'reflect-metadata';


@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger
	) {
		super(loggerService);
		const routes: IControllerRoute[] = [
			{ path: '/login', method: 'get', func: this.login },
			{ path: '/register', method: 'get', func: this.register }
		]
		this.bindRoutes(routes);
	}

	login(req: Request, res: Response, next: NextFunction) {
		next(new HTTPError('Ошибка авторизации', 401, 'login'));
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'Регистрация работает')
	}
}