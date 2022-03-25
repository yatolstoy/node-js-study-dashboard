import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		const header = req.headers.authorization;
		if (header && header.indexOf('Bearer ') !== -1) {
			const jwt = header.split(' ')[1];
			const payload = await this.asyncVerify(jwt);
			req.user = payload ? payload.login : undefined;
		}
		next();
	}

	private async asyncVerify(jwt: string): Promise<JwtPayload | null> {
		return new Promise((resolve) => {
			verify(jwt, this.secret, (err, payload) => {
				const result = !err && payload && typeof payload !== 'string' ? payload : null;
				resolve(result);
			});
		});
	}
}
