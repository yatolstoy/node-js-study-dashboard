import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.Logger) private loggerService: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.loggerService.log('[Prisma Service]: БД подключена');
		} catch (e) {
			if (e instanceof Error) {
				this.loggerService.error('[[Prisma Service]: Ошибка подключения к БД] ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
		this.loggerService.warn('[Prisma Service]: БД отключена');
	}
}
