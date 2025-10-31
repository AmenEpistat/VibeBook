import { User } from './model/User.js';
import bcrypt from 'bcrypt';
import { Role } from './model/Role.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secret } from '../config.js';

const generateAccessToken = (id, roles) => {{
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, secret.secret, { expiresIn: '24h' });
}}

export class authController {
  async registration (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors });
      }
      console.log('BODY:', req.body);
      const { email, username, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: `Пользователь с таким email ${email} уже есть` });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User ({ email, password: hashPassword, username, roles: [userRole.value] });
      await user.save();
      res.json('f');
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'registrstion error' });
    }
  }

  async login (req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: `Аккаунт с такими данными ${ email } не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Пароль неправильный' });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'login error' });
    }
  }

  async getUser (req, res) {
    try {
      const users = await User.find();
      res.json({ users });
    } catch (e) {
      console.log(e)
    }
  }
}
