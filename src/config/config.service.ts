import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class ConfigService {
	configuration: DotenvParseOutput;

	constructor(@inject(TYPES.Logger) private logger: ILogger) {
		const conf: DotenvConfigOutput = config();
		if (conf.error) {
			this.logger.error('[Config service] Ошибка: Не удалось прочитать .env файл');
		} else {
			this.logger.log('[Config service]: Файл .env импортирован');
			this.configuration = conf.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.configuration[key];
	}
}
