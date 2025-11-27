<template>
    <div class="book-card">
        <img
            class="book-card__img"
            :src="API_URL + book?.cover"
            :alt="book?.title"
            width="154"
            height=""
        />
        <div class="book-card__info">
            <h3 class="book-card__title">
                <router-link :to="`/books/${book?._id}`">
                    {{ book?.title }}
                </router-link>
            </h3>
            <p class="book-card__author">
                <router-link to="/_id"> {{ book?.author?.name }} {{ book?.author?.surname }} </router-link>
            </p>
            <p class="book-card__year-publication xs-text">{{ book?.year_publication }}</p>
            <ul class="book-card__genres">
                <li
                    v-for="(genre, index) in book?.genres"
                    :key="index"
                    class="book-card__genre"
                >
                    <genre-item :name="genre?.name" />
                </li>
            </ul>
        </div>
        <div class="book-card__user-actions">
            <UserActionSelect @onselect="handleSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Book } from '@/types/book.ts';
import GenreItem from '@/components/GenreItem.vue';
import UserActionSelect from '@/components/UserActionSelect.vue';
import { API_URL } from '@/apiConfig.ts';

const props = defineProps<{
    book: Book;
}>();

const emit = defineEmits<{
    (e: 'statusChange', bookId: string | number | undefined, status: string): void;
}>();

const handleSelect = (status: string) => {
    emit('statusChange', props.book._id, status);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.book-card {
    display: grid;
    grid-template-columns: auto 5fr 3fr;
    align-items: stretch;

    height: 200px;
}

.book-card__img {
    display: flex;
    align-items: stretch;

    object-fit: cover;

    border-radius: 5px;
}

.book-card__info {
    display: flex;
    flex-direction: column;

    padding: 16px;

    border: 1px solid $light-border-color;
    border-right: none;
    border-radius: 5px;
}

.book-card__title {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;

    a:hover {
        color: $secondary-bg-color;
    }
}

.book-card__year-publication {
}

.book-card__author {
    color: $additional-color;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    a:hover {
        color: $primary-color;
    }
}

.book-card__user-actions {
    padding: 16px;

    border: 1px solid $light-border-color;
    border-radius: 5px;
    border-left: none;

    .select {
        flex-grow: 0;
    }
}

.book-card__genres {
    display: flex;
    gap: 15px;

    margin-top: 20px;
}
</style>
