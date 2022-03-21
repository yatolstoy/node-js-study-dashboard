import express, { Express } from 'express'
import { Server } from 'http'
import { errorHandler } from './middlewares/error.middleware'
import { userRouter } from './routes/user.route'
import { loggerService } from './services/logger'

export class App {
	app: Express
	port: number
	server: Server
	logger: loggerService

	constructor(logger: loggerService) {
		this.app = express()
		this.port = 8800
		this.logger = logger
	}

	private useRoutes() {
		this.app.use('/user', userRouter);
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