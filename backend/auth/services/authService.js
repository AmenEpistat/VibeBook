import { User } from '../model/User.js'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import MailService from './mailService.js'
import AuthDto from '../dto/authDto.js'
import tokenService from './tokenService.js'

class authService {
	async reqistration(email, password, username) {
		const candidate = await User.findOne({ email });
		if (candidate){
			throw new Error('Пользователь с таким email есть');
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

	async activate (activatedLink) {
		const user = await User.findOne({ activatedLink });
		if (!user) {
			throw new Error('Неправильная ссылка для активации');
		}
		user.isActivated = true;
		await user.save();
	}
}

export default new authService();
