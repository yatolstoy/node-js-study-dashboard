import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import { verify } from 'jsonwebtoken';
import { IMiddleware } from './middleware.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		const header = req.headers.authorization;
		if (header && header.indexOf('Bearer ') !== -1) {
			const jwt = header.split(' ')[1];
			const isVerify = verify(jwt, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload !== 'string') {
					req.user = payload.login;
				}
			});
		}
		next();
	}
}
