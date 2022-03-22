import { NextFunction, Request, Response } from 'express';
import { loggerService } from '../services/logger';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './HttpError.class';

export class ExceptionFilter implements IExceptionFilter {
	logger: loggerService

	constructor(logger: loggerService) {
		this.logger = logger
	}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if(err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.code}: ${err.message}`);
			res.sendStatus(err.code);
		} else {
			this.logger.error(`Ошибка: ${err.message}`);
			res.sendStatus(500).send(err.message);
		}
		
	}
}