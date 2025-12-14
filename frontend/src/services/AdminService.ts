import { $api } from '@/apiConfig.ts';

export default class AdminService {
    static async makeAdmin(id: string) {
        return $api.post(`/api/makeAdmin/${id}`);
    }

    static async getUsers() {
        return $api.get('/api/users');
    }
}
