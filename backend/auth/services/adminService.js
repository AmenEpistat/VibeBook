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

        if (!user.roles.some(roleId => roleId.equals(adminRole._id))) {
            user.roles.unshift(adminRole._id);
            await user.save();
        }

        return user;
    }

    async deleteAdmin(userId) {
        const user = await User.findById(userId);
        console.log(user)
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }

        const adminRole = await Role.findOne({ value: 'ADMIN' });
        if (!adminRole) {
            throw ApiError.BadRequest('Роль ADMIN не найдена');
        }

        if (!user.roles.some(roleId => roleId.equals(adminRole._id))) {
            throw ApiError.BadRequest('Пользователь не имеет роль ADMIN');
        } else {
            user.roles.splice(0, 1);
            await user.save();
        }
    }

    async deleteUser(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }

        await User.deleteOne({ _id: user._id });
    }

    async getUsers (id = null) {
        const users = await User.find({ _id: { $ne: id } }).populate('roles');
        return users.map(user => new AuthDto(user));
    }
}

export default new AdminService();
