import ApiError from '../exceptions/apiError.js'

export default (err, req, res, next) => {
	console.log(err);

	if (err instanceof ApiError) {
		res.status(err.status).json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({message: 'непрeдвиденная ошибочка'});
}
