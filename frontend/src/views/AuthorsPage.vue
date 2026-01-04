<template>
    <div class="authors-page content-wrapper">
        <h2 class="authors-page__title subtitle">Авторы</h2>
        <v-btn
            v-if="isAdmin"
            rounded="xs"
            class="primary-button common-books__btn"
            @click="isActive = true"
        >
            Добавить автора
        </v-btn>
        <ul class="authors-page__list">
            <li
                v-for="author in authors"
                :key="author._id"
                class="authors-page__item"
            >
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
import { computed, onMounted, ref } from 'vue';
import AuthorForm from '@/components/AuthorForm.vue';
import { useAuthStore } from '@/stores/authStore.ts';

const authorStore = useAuthorStore();
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user.roles?.[0] === 'ADMIN');

const authors = ref<Author[]>([]);
const isActive = ref(false);

const onCreateAuthor = async () => {
    authors.value = await authorStore.getAuthors();
};

onMounted(async () => {
    await onCreateAuthor();
});
</script>

<style scoped lang="scss">
.authors-page {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 32px;
}

.authors-page__list {
    grid-column: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
