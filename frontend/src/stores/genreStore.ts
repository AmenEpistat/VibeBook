import { defineStore } from 'pinia';
import type { Genre } from '@/types/genre.ts';
import { ref } from 'vue';
import GenreService from '@/services/GenreService.ts';

export const useGenreStore = defineStore('genre', () => {
    const genres = ref<Genre[]>([]);
    const isLoading = ref(true);
    const errorMessage = ref('');

    const getGenres = async () => {
        try {
            const response = await GenreService.getGenres();
            genres.value = response.data;
            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const createGenre = async (genre: Genre) => {
        try {
            isLoading.value = true;
            const response = await GenreService.createGenre(genre);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { genres, isLoading, errorMessage, getGenres, createGenre };
});
