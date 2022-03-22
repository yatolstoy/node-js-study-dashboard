import express, { Express } from 'express'
import { Server } from 'http'
import { ExceptionFilter } from './errors/exception.filter'
import { loggerService } from './services/logger'
import { UserController } from './users/users.controller'

export class App {
	app: Express
	port: number
	server: Server
	logger: loggerService
	userController: UserController
	exceptionFilter: ExceptionFilter

	constructor(logger: loggerService, userController: UserController, exceptionFilter: ExceptionFilter) {
		this.app = express()
		this.port = 8800
		this.logger = logger

		this.userController = userController

		this.exceptionFilter = exceptionFilter
	}

	private useRoutes() {
		this.app.use('/user', this.userController.router);
	}

	private useExceptions() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init() {
		
		this.useRoutes()
		this.useExceptions()

		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}