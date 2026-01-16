import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IAuth, IAuthResponse } from '@/types/auth.ts';
import AuthService from '@/services/AuthService.ts';
import axios from 'axios';
import { API_URL } from '@/apiConfig.ts';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IAuth>({
        email: '',
        id: '',
        password: '',
        username: '',
        isActivated: false,
    });
    const isAuth = computed(() => !!user.value?.id);
    const errorMessage = ref('');
    const isLoading = ref(false);

    const login = async (userAuth: IAuth) => {
        try {
            isLoading.value = true;
            const response = await AuthService.login(userAuth);
            user.value = response.data.userDto;
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = async () => {
        try {
            isLoading.value = true;
            await AuthService.logout();
            user.value = {
                email: '',
                _id: '',
                password: '',
                username: '',
                isActivated: false,
            };
            localStorage.removeItem('token');
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const registration = async (newUser: IAuth) => {
        try {
            isLoading.value = true;
            const response = await AuthService.registration(newUser);
            user.value = response.data.userDto;
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const checkAuth = async () => {
        try {
            isLoading.value = true;
            const response = await axios.post<IAuthResponse>(`${API_URL}/api/refresh`, {}, { withCredentials: true });
            user.value = response.data?.userDto;
            localStorage.setItem('token', response.data.accessToken);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            isLoading.value = false;
        }
    };

    return { user, login, logout, registration, checkAuth, isAuth, errorMessage, isLoading };
});
