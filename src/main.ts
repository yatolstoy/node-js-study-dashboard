import { App } from './app';
import { loggerService } from './services/logger';
import { UserController } from './users/users.controller';

async function bootstrapp() {
	const logger = new loggerService();
	const app = new App(logger, new UserController(logger));
	app.init();
}

bootstrapp()