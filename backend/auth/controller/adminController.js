import AdminService from '../services/adminService.js';

class AdminController {
    async makeAdmin(req, res, next) {
        try {
            const { id } = req.params;
            await AdminService.makeAdmin(id);
            return res.json({ message: 'Пользователь стал администратором' });
        } catch (e) {
            next(e);
        }
    }

    async getUsers (req, res, next) {
        try {
            const id = req.user.id;
            const users = await AdminService.getUsers(id);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser (req, res, next) {
        try {
            const { id } = req.params;
            await AdminService.deleteUser(id);
            return res.json({message: 'Удвлен пользоватлеь'});
        } catch (e) {
            next(e);
        }
    }

    async deleteAdmin (req, res, next) {
        try {
            const { id } = req.params;
            await AdminService.deleteAdmin(id);
            return res.json({ message: 'Удвлена роль ADMIN y пользоватедя' });
        } catch (e) {
            next(e);
        }
    }
}

export default new AdminController();
