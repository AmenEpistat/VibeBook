<template>
    <section class="common-books">
        <div class="common-books__wrapper content-wrapper">
            <h2 class="common-books__title subtitle">Все книги</h2>
            <div class="common-books__filter-container" />
            <ul class="common-books__list">
                <li class="common-books__list-item">
                    <BookCard :book="book" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import BookCard from '@/components/BookCard.vue';
import type { Book } from '@/types/book.ts';

const book: Book = {
    author: {
        name: 'пушкин',
        surname: 'akrlckip',
    },
    title: 'хрень',
    genres: [
        {
            name: 'Genre',
        },
        {
            name: 'comedy',
        },
    ],
};
</script>

<style scoped lang="scss"></style>
