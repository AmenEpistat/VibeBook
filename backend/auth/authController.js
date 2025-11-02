import { User } from './model/User.js';
import bcrypt from 'bcrypt';
import { Role } from './model/Role.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secret } from '../config.js';
import authService from './services/authService.js'

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
			const { email, password, username } = req.body;
			const userData = await authService.reqistration(email, password, username);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData);
		} catch (e) {
			console.error(e);
			res.status(400).json({ message: 'registrstion error' });
		}
	}

	async activate (req, res, next) {
		try {
			const activatedLink = req.params.link;
			await authService.activate(activatedLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			console.log(e);
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
