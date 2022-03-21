import { App } from './app';
import { loggerService } from './services/logger';

async function bootstrapp() {
	const app = new App(new loggerService());
	app.init();
}

bootstrapp()