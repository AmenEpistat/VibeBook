import { User } from '../model/User.js'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import MailService from './mailService.js'
import AuthDto from '../dto/authDto.js'
import tokenService from './tokenService.js'
import ApiError from '../../common/exceptions/apiError.js'

class authService {
	async reqistration(email, password, username) {
		const candidate = await User.findOne({ email });
		if (candidate){
			throw ApiError.BadRequest('Пользователь с таким email есть');
		}
		const hashPassword = await bcrypt.hash(password, 7);
		const activatedLink = uuid.v4();

		const user = await User.create({ email, password: hashPassword, username, activatedLink });
		await MailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activatedLink}`);

		const userDto = new AuthDto(user);
		const tokens = tokenService.generateToken({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			userDto,
		}
	}

	async login (email, password) {
		const user = await User.findOne({ email });
		if (!user) {
			return throw ApiError.BadRequest(`Аккаунт с логином ${ email } не найден`);
		}

		const validPassword = bcrypt.compare(password, user.password);
		if (!validPassword) {
			return throw ApiError.BadRequest('Пароль неправильный');
		}

		const userDto = new AuthDto(user);
		const tokens = tokenService.generateToken({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			userDto,
		}
	}

	async logout (refreshToken) {
		return await tokenService.removeToken(refreshToken);
	}

	async refresh (refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await User.findById(userData.id);
		const userDto = new AuthDto(user);
		const tokens = tokenService.generateToken({...userDto});
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			userDto,
		}
	}

	async activate (activatedLink) {
		const user = await User.findOne({ activatedLink });
		if (!user) {
			throw ApiError.BadRequest('Неправильная ссылка для активации');
		}
		user.isActivated = true;
		await user.save();
	}
}

export default new authService();
