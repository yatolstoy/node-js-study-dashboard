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

	public async init() {
		this.app.use('/user', userRouter);
		this.app.use(errorHandler);

		this.server = this.app.listen(this.port, () => {
			console.log(`Сервер запущен на http://localhost:${this.port}`);
		})
	}
}