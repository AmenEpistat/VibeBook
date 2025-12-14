import AuthDto from '../dto/authDto.js';
import { User } from '../model/User.js';
import ApiError from '../../common/exceptions/apiError.js';
import { Role } from '../model/Role.js';

class AdminService {
    async makeAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }

        const adminRole = await Role.findOne({ value: 'ADMIN' });
        if (!adminRole) {
            throw ApiError.BadRequest('Роль ADMIN не найдена');
        }

        if (!user.roles.includes(adminRole._id)) {
            user.roles.push(adminRole._id);
            await user.save();
        }

        return user;
    }

    async getUsers () {
        const users = await User.find().populate('roles');
        return users.map(user => new AuthDto(user));
    }
}

export default new AdminService();
