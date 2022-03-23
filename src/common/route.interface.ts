import { NextFunction, Request, Response, Router } from 'express';

export interface IControllerRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'put' | 'patch'>;
	func: (req: Request, res: Response, next: NextFunction) => void;
}

export type ExpressReturnType = Response<any, Record<string, any>>;
