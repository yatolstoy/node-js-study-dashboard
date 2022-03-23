import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8800;
	}

	private useRoutes(): void {
		this.app.use('/user', this.userController.router);
	}

	private useExceptions(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptions();

		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
