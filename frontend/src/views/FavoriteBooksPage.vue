<template>
    <div class="favorite-books content-wrapper">
        <h2 class="favorite-books__title subtitle">Избранное</h2>
        <ul class="favorite-books__list">
            <li
                v-for="i in favBooks"
                :key="i.book._id"
                class="favorite-books__item"
            >
                <BookCard
                    :book="i.book"
                    :is-admin="isAdmin"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import BookCard from '@/components/BookCard.vue';
import { useUserBookStore } from '@/stores/userBookStore.ts';
import { computed, onMounted, ref } from 'vue';
import type { UserBook } from '@/types/user.ts';
import { useAuthStore } from '@/stores/authStore.ts';

const favBooks = ref<UserBook[]>([]);
const books = ref<UserBook[]>([]);

const userBookStore = useUserBookStore();
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user.roles?.[0] === 'ADMIN');

const getFavoriteBooks = (books: UserBook[]) => {
    return books.filter((i: UserBook) => i.isFavorite);
};

onMounted(async () => {
    await userBookStore.getBooks();
    books.value = userBookStore.userBooks;

    favBooks.value = getFavoriteBooks(books.value);
});
</script>

<style scoped lang="scss">
.favorite-books__title {
    margin-bottom: 32px;
}

.favorite-books__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}
</style>
