import { Container } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { loggerService } from './logger/logger';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';

const appContainer = new Container();

appContainer.bind<ILogger>(TYPES.Logger).to(loggerService)
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Application).to(App)

const app = appContainer.get<App>(TYPES.Application)
app.init();

export { app, appContainer }