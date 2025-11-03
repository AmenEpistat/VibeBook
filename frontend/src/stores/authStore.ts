import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IAuth, IAuthResponse } from '@/types/auth.ts';
import AuthService from '@/services/AuthService.ts';
import axios from 'axios';
import { API_URL } from '@/http/apiConfig.ts';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IAuth>({
        email: '',
        id: '',
        password: '',
        username: '',
        isActivated: false,
    });

    const login = async (userAuth: IAuth) => {
        try {
            const response = await AuthService.login(userAuth);
            user.value = response.data.user;
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            user.value = {
                email: '',
                id: '',
                password: '',
                username: '',
                isActivated: false,
            };
            localStorage.removeItem('token');
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const registration = async (newUser: IAuth) => {
        try {
            const response = await AuthService.registration(newUser);
            user.value = response.data.user;
            console.log(response.data.user);
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    const checkAuth = async () => {
        try {
            const response = await axios.post<IAuthResponse>(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
            user.value = response.data.user;
            localStorage.setItem('token', response.data.accessToken);
            console.log(response);
            console.log(document.cookie);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    };

    return { user, login, logout, registration, checkAuth };
});
