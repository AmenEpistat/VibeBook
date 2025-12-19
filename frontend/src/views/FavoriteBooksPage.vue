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
                    :is-admin="false"
                    :book-state="i.userState"
                    @status-change="onStatusChange"
                    @append-fav="onAppendFav"
                    @append-queue="onAppendQueue"
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
import { useBookStore } from '@/stores/bookStore.ts';
import type { BookWithStates } from '@/types/book.ts';
import type { StatusBook } from '@/consts/statusBook.ts';

const userBookStore = useUserBookStore();

const books = computed(() =>
    userBookStore.userBooks.map((b) => ({
        book: b.book,
        userState: {
            isFavorite: b.isFavorite,
            isQueue: b.isQueue,
            status: b.status,
        },
    })),
);

const favBooks = computed(() => books.value.filter((b) => b.userState.isFavorite));

const onStatusChange = (status: StatusBook, bookId: string) => userBookStore.updateStatus(bookId, status);

const onAppendFav = (bookId: string) => {
    userBookStore.toggleFavorite(bookId);
};

const onAppendQueue = (bookId: string) => userBookStore.toggleQueue(bookId);

onMounted(async () => {
    await userBookStore.getBooks();
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
