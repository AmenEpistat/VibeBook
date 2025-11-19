<template>
    <section class="book">
        <div class="book__wrapper content-wrapper">
            <h2 class="book__title">
                {{ book?.title }}
            </h2>
            <p class="book__author">{{ book?.author.name }} {{ book?.author.surname }}</p>
            <ul class="book__genres">
                <li
                    v-for="(genre, index) in book?.genres"
                    :key="index"
                    class="book__genre"
                >
                    <genre-item :name="genre.name" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useBookStore } from '@/stores/bookStore.ts';
import type { Book } from '@/types/book.ts';
import GenreItem from '@/components/GenreItem.vue';

const route = useRoute();
const bookId = computed(() => String(route.params.id));

const bookStore = useBookStore();
const book = ref<Book>();

onMounted(async () => {
    book.value = await bookStore.getBook(bookId.value);
});
</script>

<style scoped lang="scss">
.book__title {
    margin-bottom: 10px;
}
</style>
