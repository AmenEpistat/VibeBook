<template>
    <section class="common-books">
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
                    v-for="book in books"
                    :key="book._id"
                    class="common-books__list-item"
                >
                    <BookCard
                        :book="book"
                        :is-admin="isAdmin"
                        @edit-book="onEditBook"
                    />
                </li>
            </ul>
        </div>
        <BookCreateForm
            v-model="isActive"
            @saved="onCreateBook"
        />
    </section>
</template>

<script setup lang="ts">
import BookCard from '@/components/BookCard.vue';
import type { Book } from '@/types/book.ts';
import { computed, onMounted, ref } from 'vue';
import { useBookStore } from '@/stores/bookStore.ts';
import BookCreateForm from '@/components/BookCreateForm.vue';
import { useAuthStore } from '@/stores/authStore.ts';

const books = ref<Book[]>([]);

const isActive = ref(false);

const bookStore = useBookStore();
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user.roles?.[0] === 'ADMIN');

const getBooks = async () => {
    await bookStore.getBooks();
    books.value = bookStore.books;
};

const onCreateBook = async () => {
    isActive.value = false;

    await getBooks();
    books.value = bookStore.books;
};

const onEditBook = async () => {
    await getBooks();
    books.value = bookStore.books;
};

onMounted(async () => {
    await getBooks();
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
