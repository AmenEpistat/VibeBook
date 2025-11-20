<template>
    <section class="book">
        <div class="book__wrapper container">
            <img
                class="book__img"
                :src="API_URL + book?.cover"
                :alt="book?.title"
                width="280"
                height=""
            />
            <div class="book__info">
                <h2 class="book__title">
                    {{ book?.title }}
                </h2>
                <p class="book__author">{{ book?.author.name }} {{ book?.author.surname }}</p>
                <p class="book__year-publication s-text">{{ book?.year_publication }}</p>
                <ul class="book__genres">
                    <li
                        v-for="(genre, index) in book?.genres"
                        :key="index"
                        class="book__genre"
                    >
                        <genre-item :name="genre.name" />
                    </li>
                </ul>
                <div class="book__description">
                    <p class="book__description-title">Описание</p>
                    {{ book?.description }}
                </div>
            </div>
            <UserActionSelect @onselect="handleSelect" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useBookStore } from '@/stores/bookStore.ts';
import type { Book } from '@/types/book.ts';
import GenreItem from '@/components/GenreItem.vue';
import { API_URL } from '@/apiConfig.ts';
import UserActionSelect from '@/components/UserActionSelect.vue';

const route = useRoute();
const bookId = computed(() => String(route.params.id));

const bookStore = useBookStore();
const book = ref<Book>();

onMounted(async () => {
    book.value = await bookStore.getBook(bookId.value);
});

const handleSelect = (status: string) => {};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.book__wrapper {
    display: grid;
    grid-template-columns: auto 2fr 1fr;
    align-items: start;
    gap: 50px;
}

.book__author {
    margin-bottom: 3px;

    color: $secondary-color;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;

    a:hover {
        color: $primary-color;
    }
}

.book__year-publication {
    margin-bottom: 10px;
}

.book__genres {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;

    margin-bottom: 20px;
}

.book__description {
    @include boundaries;

    padding: 24px;

    border-radius: 8px;
}

.book__description-title {
    margin-bottom: 10px;

    text-transform: uppercase;
    color: $secondary-color;
    font-size: 16px;
    font-weight: 600;
}
</style>
