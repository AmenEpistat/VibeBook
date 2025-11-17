<template>
    <section class="common-books">
        <div class="common-books__wrapper content-wrapper">
            <h2 class="common-books__title subtitle">Все книги</h2>
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
    </section>
</template>

<script setup lang="ts">
import BookCard from '@/components/BookCard.vue';
import type { Book } from '@/types/book.ts';
import { onMounted, ref } from 'vue';
import { useBookStore } from '@/stores/bookStore.ts';

const books = ref<Book[]>([]);

const bookStore = useBookStore();

const getBooks = async () => {
    await bookStore.getBooks();
    console.log('ffff');
    books.value = bookStore.books;
};

onMounted(async () => {
    console.log('ffff');
    await getBooks();
});
</script>

<style scoped lang="scss"></style>
