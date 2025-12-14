import { defineStore } from 'pinia';
import { ref } from 'vue';
import AdminService from '@/services/AdminService.ts';

export const useAdminStore = defineStore('adminStore', () => {
    const errorMessage = ref('');
    const isLoading = ref(false);

    const getUsers = async () => {
        try {
            isLoading.value = true;
            const response = await AdminService.getUsers();
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const makeAdmin = async (id: string) => {
        try {
            isLoading.value = true;
            const response = await AdminService.makeAdmin(id);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { errorMessage, isLoading, getUsers, makeAdmin };
});
