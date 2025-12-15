import { $api } from '@/apiConfig.ts';

export default class AdminService {
    static async makeAdmin(id: string) {
        return $api.post(`/api/admin/${id}`);
    }

    static async deleteAdmin(id: string) {
        return $api.delete(`/api/admin/${id}`);
    }

    static async deleteUser(id: string) {
        return $api.delete(`/api/user/${id}`);
    }

    static async getUsers() {
        return $api.get('/api/users');
    }
}
