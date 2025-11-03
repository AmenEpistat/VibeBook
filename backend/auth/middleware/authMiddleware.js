import ApiError from '../../common/exceptions/apiError.js'
import tokenService from '../services/tokenService.js'

export const authMiddleware = (req, res, next) => {
	if (req.method === "OPTIONS") {
		next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			next(ApiError.UnauthorizedError());
		}

		const userData = tokenService.validateAccessToken(token);
		if (!userData) {
			next(ApiError.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (e) {
		next(ApiError.UnauthorizedError());
	}
}
