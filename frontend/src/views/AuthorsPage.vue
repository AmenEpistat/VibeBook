<template>
    <div class="authors-page content-wrapper">
        <h2 class="authors-page__title subtitle">Авторы</h2>
        <v-btn
            rounded="xs"
            class="primary-button common-books__btn"
            @click="isActive = true"
        >
            Добавить автора
        </v-btn>
        <ul
            v-for="author in authors"
            :key="author._id"
            class="authors-page__list"
        >
            <li class="authors-page__item">
                <AuthorCard :author="author" />
            </li>
        </ul>
        <AuthorForm
            v-model="isActive"
            @saved="onCreateAuthor"
        />
    </div>
</template>

<script setup lang="ts">
import AuthorCard from '@/components/AuthorCard.vue';
import { useAuthorStore } from '@/stores/authorStore.ts';
import type { Author } from '@/types/author.ts';
import { onMounted, ref } from 'vue';
import AuthorForm from '@/components/AuthorForm.vue';

const authorStore = useAuthorStore();

const authors = ref<Author[]>([]);
const isActive = ref(false);

const onCreateAuthor = async () => {
    await authorStore.getAuthors();
    console.log(authors);
    authors.value = authorStore.authors;
};

onMounted(async () => {
    await authorStore.getAuthors();
    authors.value = authorStore.authors;
});
</script>

<style scoped lang="scss"></style>
