import { Request, Response, NextFunction } from 'express'

const errorHandler = function(err: Error, req: Request, res: Response, next: NextFunction) {
	res.status(401).send(err.message);
}

export { errorHandler };