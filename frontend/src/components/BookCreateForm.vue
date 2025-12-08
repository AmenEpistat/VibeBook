<template>
    <v-form
        class="book-form"
        @submit.prevent="submit"
    >
        <v-text-field
            v-model="form.title"
            label="Название книги"
            required
        />

        <v-textarea
            v-model="form.description"
            label="Описание"
            auto-grow
        />

        <v-select
            v-model="form.author_id"
            :items="authors"
            item-title="name"
            item-value="_id"
            label="Автор"
            clearable
        />

        <v-autocomplete
            v-model="form.genres_id"
            :items="genres"
            item-title="name"
            item-value="_id"
            label="Жанры"
            multiple
            chips
            clearable
        />

        <v-text-field
            v-model="form.year_publication"
            type="date"
            label="Дата публикации"
        />

        <v-file-input
            v-model="form.cover"
            accept="image/*"
            label="Обложка книги"
        />

        <v-btn
            type="submit"
            rounded="xs"
            class="primary-button"
        >
            Создать книгу
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthorStore } from '@/stores/authorStore.ts';
import { useGenreStore } from '@/stores/genreStore.ts';
import { useBookStore } from '@/stores/bookStore.ts';
import type { Author } from '@/types/author.ts';
import type { Genre } from '@/types/genre.ts';

const form = ref({
    title: '',
    description: '',
    author_id: '',
    genres_id: [],
    year_publication: '',
    cover: null,
});

const authors = ref<Author[]>([]);
const genres = ref<Genre[]>([]);

const authorStore = useAuthorStore();
const genreStore = useGenreStore();
const bookStore = useBookStore();

onMounted(() => {
    loadAuthors();
    loadGenres();
});

const loadAuthors = async () => {
    await authorStore.getAuthors();
    authors.value = authorStore.authors;
};

const loadGenres = async () => {
    await genreStore.getGenres();
    genres.value = genreStore.genres;
};

const submit = async () => {
    const fd = new FormData();

    fd.append('title', form.value.title);
    fd.append('description', form.value.description);
    fd.append('author_id', form.value.author_id);
    console.log(form.value.year_publication);
    fd.append('year_publication', form.value.year_publication);

    form.value.genres_id.forEach((id) => fd.append('genres_id', id));

    if (form.value.cover) {
        fd.append('cover', form.value.cover);
    }

    await bookStore.createBook(fd);
};
</script>
