import axios from 'axios';
import type { IAuthResponse } from '@/types/auth.ts';
export const API_URL = 'http://localhost:3000';

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        console.log(error);
        if (error.response.status === 401 && !error.config._isRetry && error.config) {
            error.config._isRetry = true;
            try {
                const response = await axios.get<IAuthResponse>(`${API_URL}/api/refresh`, { withCredentials: true });
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(error.config);
            } catch (e) {}
        }
        throw error;
    },
);
