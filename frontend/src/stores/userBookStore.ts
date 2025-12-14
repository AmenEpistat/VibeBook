import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserActionBook, UserBook } from '@/types/user.ts';
import UserBookService from '@/services/UserBookService.ts';

export const useUserBookStore = defineStore('userBook', () => {
    const isLoading = ref(false);
    const errorMessage = ref('');

    const books = ref<UserBook[]>([]);
    const userBook = ref<UserActionBook>();

    const getBooks = async () => {
        try {
            isLoading.value = true;
            const response = await UserBookService.getUserBook();
            books.value = response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { isLoading, errorMessage, books, userBook, getBooks };
});
