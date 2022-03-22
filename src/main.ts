import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { loggerService } from './services/logger';
import { UserController } from './users/users.controller';

async function bootstrapp() {
	const logger = new loggerService();
	const app = new App(logger, new UserController(logger), new ExceptionFilter(logger));
	app.init();
}

bootstrapp()