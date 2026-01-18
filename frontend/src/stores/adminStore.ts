import { defineStore } from 'pinia';
import AdminService from '@/services/AdminService';
import { useRequest } from '@/composables/useRequest';

export const useAdminStore = defineStore('adminStore', () => {
    const { isLoading, data, fetch } = useRequest<any>();
    const getUsers = async () => {
        return await fetch(AdminService.getUsers);
    };

    const makeAdmin = async (id: string) => {
        return await fetch(AdminService.makeAdmin, id);
    };

    const deleteAdmin = async (id: string) => {
        return await fetch(AdminService.deleteAdmin, id);
    };

    const deleteUser = async (id: string) => {
        return await fetch(AdminService.deleteUser, id);
    };

    return { isLoading, data, getUsers, makeAdmin, deleteAdmin, deleteUser };
});
