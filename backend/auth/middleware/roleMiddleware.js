export const roleMiddleware = (roles) => {
	return function(req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}

        try {
            if (!req.user || !req.user.roles) {
                return res.status(403).json({ message: 'Нет данных пользователя' });
            }

            const userRoles = req.user.roles;
            const hasRole = userRoles.some(role => roles.includes(role));

            if (!hasRole) {
                return res.status(403).json({ message: 'Нет доступа' });
            }

            next();
        } catch (e) {
            return res.status(403).json({ message: 'Ошибка проверки ролей' });
        }
	}
}
