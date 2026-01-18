import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IAuth, IAuthResponse, User } from '@/types/auth.ts';
import AuthService from '@/services/AuthService.ts';
import { useRequest } from '@/composables/useRequest.ts';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    const { fetch, isLoading } = useRequest<IAuthResponse>();

    const isAuth = computed(() => !!user.value?.id);

    const login = async (userAuth: IAuth) => {
        const response = await fetch(AuthService.login, userAuth);
        user.value = response.userDto;
        localStorage.setItem('token', response.accessToken);
    };

    const logout = async () => {
        await fetch(AuthService.logout);
        user.value = null;
        localStorage.removeItem('token');
    };

    const registration = async (newUser: IAuth) => {
        const response = await fetch(AuthService.registration, newUser);
        user.value = response.userDto;
        localStorage.setItem('token', response.accessToken);
    };

    const checkAuth = async () => {
        try {
            const response = await AuthService.refresh();
            user.value = response.data?.userDto;
            localStorage.setItem('token', response.data.accessToken);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    };

    return { user, login, logout, registration, checkAuth, isAuth, isLoading };
});
