<template>
    <div
        v-if="!isFavorite"
        class="status-item"
    >
        <p class="status-item__title">{{ status }} ({{ books.length }})</p>
        <div class="status-item__info">
            <ul class="status-item__books">
                <li
                    v-for="book in books"
                    :key="book._id"
                    class="status-item__book"
                >
                    <router-link :to="`/books/${book?._id}`">
                        <img
                            class="status-item__book-img"
                            :src="API_URL + book?.cover"
                            :alt="book?.title"
                            width="100"
                            height=""
                        />
                    </router-link>
                </li>
            </ul>
            <v-btn
                variant="plain"
                class="status-item__button"
                @click="goToPage"
            >
                <v-icon
                    size="44"
                    color="grey-darken-1"
                >
                    mdi-arrow-right-circle-outline
                </v-icon>
            </v-btn>
        </div>
    </div>
    <div
        v-if="isFavorite"
        class="fav-books"
    >
        <p class="status-item__title status-item__title--fav">⭐ {{ status }} ⭐</p>
        <ul class="status-item__books">
            <li
                v-for="book in books"
                :key="book._id"
                class="status-item__book"
            >
                <router-link :to="`/books/${book?._id}`">
                    <img
                        class="status-item__book-img"
                        :src="API_URL + book?.cover"
                        :alt="book?.title"
                        width="100"
                        height=""
                    />
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Book } from '@/types/book.ts';
import { API_URL } from '@/apiConfig.ts';

const props = defineProps<{
    books: Book[];
    status: string;
    isFavorite?: boolean;
}>();
const emit = defineEmits(['click']);

const goToPage = () => {
    emit('click');
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.status-item__info {
    display: flex;
    align-items: center;
}

.status-item__title {
    margin-bottom: 8px;

    color: $primary-color;
    font-size: 20px;
    font-weight: 600;

    &--fav {
        color: $secondary-bg-color;
    }
}

.status-item__books {
    display: flex;
    gap: 8px;

    overflow: hidden;
}

.status-item__book {
    flex-basis: 100px;
}

.status-item__book-img {
    @include boundaries;

    width: 100px;
    height: 150px;
    object-fit: cover;
}
</style>
