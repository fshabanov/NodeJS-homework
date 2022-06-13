const responseMiddleware = (req, res, next) => {
	// TODO: Implement middleware that returns result of the query
	if (res.error) {
		res.status(res.error.status).json(res.error);
	} else {
		res.status(res.data.status || 200).json(res.data);
	}
	next();
};

exports.responseMiddleware = responseMiddleware;
