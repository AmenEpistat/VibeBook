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
        <ul class="genres-page__list">
            <li
                v-for="genre in genres"
                :key="genre._id"
                class="genres-page__item"
            >
                <GenreCard :genre="genre" />
            </li>
        </ul>
        <GenreForm
            v-model="isActive"
            @saved="getGenres"
        />
    </div>
    <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import GenreCard from '@/components/GenreCard.vue';
import { useGenreStore } from '@/stores/genreStore.ts';
import type { Genre } from '@/types/genre.ts';
import { computed, onMounted, ref } from 'vue';
import GenreForm from '@/components/GenreForm.vue';
import Loader from '@/components/Loader.vue';

const genreStore = useGenreStore();

const genres = ref<Genre[]>([]);
const isActive = ref(false);
const isLoading = computed(() => genreStore.isLoading);

const getGenres = async () => {
    genres.value = await genreStore.getGenres();
};

onMounted(async () => {
    await getGenres();
});
</script>

<style scoped lang="scss">
.genres-page {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 32px;
}

.genres-page__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    grid-column: 1/-1;
}
</style>
