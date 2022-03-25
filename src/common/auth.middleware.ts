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
			req.user = payload.login;
		}
		next();
	}

	async asyncVerify(jwt: string): Promise<JwtPayload> {
		return new Promise((resolve, reject) => {
			verify(jwt, this.secret, (err, payload) => {
				if (!err && payload && typeof payload !== 'string') {
					resolve(payload);
				} else {
					reject();
				}
			});
		});
	}
}
