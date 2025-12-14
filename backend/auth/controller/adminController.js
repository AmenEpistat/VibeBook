import AdminService from '../services/adminService.js';

class AdminController {
    async makeAdmin(req, res, next) {
        try {
            const { userId } = req.params;
            await AdminService.makeAdmin(userId);
            return res.json({ message: 'Пользователь стал администратором' });
        } catch (e) {
            next(e);
        }
    }
    async getUsers (req, res, next) {
        try {
            const user_id = req.user.id;
            const allUsers = await AdminService.getUsers();
            const users = allUsers.filter(user => user._id !== user_id);
            res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

export default new AdminController();
