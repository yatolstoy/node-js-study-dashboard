import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IControllerRoute } from './route.interface';
import 'reflect-metadata';

@injectable()
export class BaseController {
	private readonly _router: Router

	constructor(private logger: ILogger) {
		this._router = Router();
	}
	
	get router() {
		return this._router;
	}

	public send<T>(res: Response, message: T, code: number) {
		res.type('application/json');
		return res.status(code).json(message)
	}

	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, message, 200);
	}

	public created(res: Response) {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for(const route of routes) {
			this.logger.log(`[${route.method}]: ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}

}