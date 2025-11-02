import jwt from 'jsonwebtoken';

export const roleMiddleware = (roles) => {
	return function(req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}

		try {
			console.log(req.headers)
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				res.status(403).json({ message: 'Пользователь не авторизован' });
			}
			const { roles: userRoles } = jwt.verify(token, process.env.SECRET_KEY);
			let hasRole = false;
			userRoles.forEach(role => {
				if(roles.includes(role)) {
					hasRole = true;
				}
			});
			if (!hasRole) {
				res.status(403).json({ message: 'Нет доступа' });
			}
			next();
		} catch (e) {
			console.error(e);
			res.status(403).json({ message: 'Пользователь не авторизован' });
		}
	}
}
