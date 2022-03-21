const errorHandler = function(err, req, res, next) {
	res.status(401).send(err.message);
}

export { errorHandler };