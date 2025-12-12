<template>
    <div class="genres-page content-wrapper">
        <h2 class="genres-page__title subtitle">Жанры книг</h2>
        <v-btn
            rounded="xs"
            class="primary-button common-books__btn"
            @click="isActive = true"
        >
            Добавить жанр
        </v-btn>
        <ul
            v-for="genre in genres"
            :key="genre._id"
            class="genres-page__list"
        >
            <li class="genres-page__item">
                <GenreCard :genre="genre" />
            </li>
        </ul>
        <GenreForm
            v-model="isActive"
            @saved="getGenres"
        />
    </div>
</template>

<script setup lang="ts">
import GenreCard from '@/components/GenreCard.vue';
import { useGenreStore } from '@/stores/genreStore.ts';
import type { Genre } from '@/types/genre.ts';
import { onMounted, ref } from 'vue';
import GenreForm from '@/components/GenreForm.vue';

const genreStore = useGenreStore();

const genres = ref<Genre[]>([]);
const isActive = ref(false);

const getGenres = async () => {
    await genreStore.getGenres();
    genres.value = genreStore.genres;
};

onMounted(async () => {
    await getGenres();
});
</script>

<style scoped lang="scss"></style>
