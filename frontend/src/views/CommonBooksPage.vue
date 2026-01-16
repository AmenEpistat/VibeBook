<template>
    <section class="common-allBooks">
        <div class="common-books__wrapper content-wrapper">
            <h2 class="common-books__title subtitle">Все книги</h2>
            <v-btn
                v-if="isAdmin"
                rounded="xs"
                class="primary-button common-books__btn"
                @click="isActive = true"
            >
                Создать книгу
            </v-btn>
            <div class="common-books__filter-container" />
            <ul class="common-books__list">
                <li
                    v-for="book in booksWithState"
                    :key="book._id"
                    class="common-books__list-item"
                >
                    <BookCard
                        :book="book"
                        :book-state="book.userState"
                        :is-admin="isAdmin"
                        @edit-book="onEditBook"
                        @status-change="onStatusChange"
                        @append-fav="onAppendFav"
                        @append-queue="onAppendQueue"
                    />
                </li>
            </ul>
        </div>
        <BookCreateForm
            v-model="isActive"
            @saved="onCreateBook"
        />
    </section>
    <Loader v-if="isLoading" />
</template>

x
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BookCard from '@/components/BookCard.vue';
import BookCreateForm from '@/components/BookCreateForm.vue';

import { useBookStore } from '@/stores/bookStore';
import { useUserBookStore } from '@/stores/userBookStore';
import { useAuthStore } from '@/stores/authStore';

import type { StatusBook } from '@/consts/statusBook';
import Loader from '@/components/Loader.vue';

const isActive = ref(false);

const bookStore = useBookStore();
const userBookStore = useUserBookStore();
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user.roles?.[0] === 'ADMIN');
const isLoading = computed(() => {
    return bookStore.isLoading || userBookStore.isLoading;
});
const booksWithState = computed(() => bookStore.booksWithState);

const onCreateBook = async () => {
    isActive.value = false;
    await bookStore.getBooks();
};

const onEditBook = async () => {
    await bookStore.getBooks();
};

const onStatusChange = (status: StatusBook, bookId: string) => userBookStore.updateStatus(bookId, status);

const onAppendFav = (bookId: string) => userBookStore.toggleFavorite(bookId);

const onAppendQueue = (bookId: string) => userBookStore.toggleQueue(bookId);

onMounted(async () => {
    await Promise.all([bookStore.getBooks(), userBookStore.getBooks()]);
});
</script>

<style scoped lang="scss">
.common-books__wrapper {
    display: grid;
    grid-template-columns: 1fr min-content;
}

.common-books__title {
    margin-bottom: 32px;
}

.common-books__btn {
    grid-column: 2/-1;
}

.common-books__list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    grid-column: 1/-1;
}
</style>
