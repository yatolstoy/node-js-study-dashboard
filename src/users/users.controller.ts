import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/route.interface';
import { HTTPError } from '../errors/HttpError.class';
import { loggerService } from '../services/logger';

export class UserController extends BaseController {
	constructor(logger: loggerService) {
		super(logger);
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