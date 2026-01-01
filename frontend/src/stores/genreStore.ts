import { defineStore } from 'pinia';
import type { Genre } from '@/types/genre.ts';
import GenreService from '@/services/GenreService.ts';
import { useRequest } from '@/composables/useRequest.ts';

export const useGenreStore = defineStore('genre', () => {
    const { isLoading, errorMessage, data, fetch } = useRequest<any>();

    const getGenres = async () => {
        return await fetch(GenreService.getGenres);
    };

    const createGenre = async (genre: Genre) => {
        return await fetch(GenreService.createGenre, genre);
    };

    return { isLoading, errorMessage, getGenres, createGenre };
});
