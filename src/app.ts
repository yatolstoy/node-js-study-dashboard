import express, { Express } from 'express'
import { Server } from 'http'
import { errorHandler } from './middlewares/error.middleware'
import { loggerService } from './services/logger'
import { UserController } from './users/users.controller'

export class App {
	app: Express
	port: number
	server: Server
	logger: loggerService
	userController: UserController

	constructor(logger: loggerService, userController: UserController) {
		this.app = express()
		this.port = 8800
		this.logger = logger

		this.userController = userController
	}

	private useRoutes() {
		this.app.use('/user', this.userController.router);
	}

	private useExceptions() {
		this.app.use(errorHandler);
	}

	public async init() {
		
		this.useRoutes()
		this.useExceptions()

		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}