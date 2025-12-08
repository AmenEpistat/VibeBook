import { defineStore } from 'pinia';
import type { Author } from '@/types/author.ts';
import { ref } from 'vue';
import AuthorService from '@/services/AuthorService.ts';

export const useAuthorStore = defineStore('author', () => {
    const authors = ref<Author[]>([]);
    const isLoading = ref(true);
    const errorMessage = ref('');

    const getAuthors = async () => {
        try {
            const response = await AuthorService.getAuthors();
            authors.value = response.data;
            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const createAuthor = async (author: Author) => {
        try {
            isLoading.value = true;
            const response = await AuthorService.createAuthor(author);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { authors, isLoading, errorMessage, getAuthors, createAuthor };
});
