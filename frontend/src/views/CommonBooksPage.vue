<template>
    <section class="common-books">
        <div class="common-books__wrapper content-wrapper">
            <h2 class="common-books__title subtitle">Все книги</h2>
            <v-btn
                v-if="isAdmin"
                rounded="xs"
                class="primary-button"
                @click="dialog = true"
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
                    <BookCard :book="book" />
                </li>
            </ul>
        </div>
        <v-dialog
            v-if="isAdmin"
            v-model="dialog"
            max-width="600"
        >
            <v-card class="common-books__modal">
                <BookCreateForm @saved="onCreateBook" />
            </v-card>
        </v-dialog>
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

const dialog = ref(false);

const bookStore = useBookStore();
const authStore = useAuthStore();

const isAdmin = computed(() => authStore.user.roles?.[0] ?? 'user');

const getBooks = async () => {
    await bookStore.getBooks();
    books.value = bookStore.books;
};

const onCreateBook = async () => {
    dialog.value = false;

    await getBooks();
    books.value = bookStore.books;
};

onMounted(async () => {
    await getBooks();
});
</script>

<style scoped lang="scss">
.common-books__title {
    margin-bottom: 30px;
}

.common-books__list {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.common-books__modal {
    padding: 50px;
}
</style>
