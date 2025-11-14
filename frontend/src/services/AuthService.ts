import type { IAuth, IAuthResponse } from '@/types/auth.ts';
import { $api, apiReqistration } from '@/http/apiConfig.ts';

export default class AuthService {
    static async login(user: IAuth) {
        return $api.post<IAuthResponse>('/api/login', {
            email: user.email,
            password: user.password,
        });
    }

    static async registration(user: IAuth) {
        return $api.post<IAuthResponse>('/api/registration', {
            email: user.email,
            password: user.password,
            username: user.username,
        });
    }

    static async logout(): Promise<void> {
        return $api.get('/api/logout');
    }
}
