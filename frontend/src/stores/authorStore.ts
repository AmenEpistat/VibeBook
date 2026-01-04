import { defineStore } from 'pinia';
import type { Author } from '@/types/author.ts';
import AuthorService from '@/services/AuthorService.ts';
import { useRequest } from '@/composables/useRequest.ts';

export const useAuthorStore = defineStore('author', () => {
    const { isLoading, errorMessage, data, fetch } = useRequest<any>();

    const getAuthors = async () => {
        return await fetch(AuthorService.getAuthors);
    };

    const createAuthor = async (author: Author) => {
        return await fetch(AuthorService.createAuthor, author);
    };

    return { isLoading, errorMessage, getAuthors, createAuthor };
});
