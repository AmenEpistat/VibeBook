import { User } from './model/User.js';
import authService from './services/authService.js'
import ApiError from '../common/exceptions/apiError.js'
import { validationResult } from 'express-validator'

export class authController {
	async registration (req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Оштбка при валидации', errors.array()));
			}
			const { email, password, username } = req.body;
			const userData = await authService.reqistration(email, password, username);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async activate (req, res, next) {
		try {
			const activatedLink = req.params.link;
			await authService.activate(activatedLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}

	async login (req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await authService.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(200).json({message: 'ok'});
    } catch (e) {
      next(e);
    }
  }

  async refresh (req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await authService.refresh(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json(userData);
		} catch (e) {
			next(e);
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
