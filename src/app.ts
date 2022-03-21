import express, { Express } from 'express'
import { Server } from 'http'
import { errorHandler } from './middlewares/error.middleware'
import { userRouter } from './routes/user.route'

export class App {
	app: Express
	port: number
	server: Server

	constructor(port: number) {
		this.app = express()
		this.port = port
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
		console.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}