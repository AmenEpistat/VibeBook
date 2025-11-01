import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'Пользователь не авторизован'});
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: 'Пользователь не авторизован'});
  }
}
