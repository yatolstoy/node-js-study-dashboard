import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './HttpError.class';

@injectable()
export class ExceptionFilter implements IExceptionFilter {

	constructor(@inject(TYPES.Logger) private logger: ILogger) {
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