import jwt from 'jsonwebtoken'
import { Token } from '../model/Token.js'

class tokenService {
	generateToken (payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30m'});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'});
		return {
			accessToken,
			refreshToken,
		}
	}
	async saveToken (userId, refreshToken) {
		const tokenData = await Token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		return await Token.create({ user: userId, refreshToken });
	}
}

export default new tokenService();
