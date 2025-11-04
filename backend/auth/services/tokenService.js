import jwt from 'jsonwebtoken'
import { Token } from '../model/Token.js'

class tokenService {
	generateToken (payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '10m'});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'});
		return {
			accessToken,
			refreshToken,
		}
	}

	validateAccessToken (token) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_KEY);
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken (token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_KEY);
		} catch (e) {
			return null;
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

	async removeToken (refreshToken) {
		return await Token.deleteOne({ refreshToken });
	}

	async findToken (refreshToken) {
		return await Token.findOne({ refreshToken });
	}
}

export default new tokenService();
