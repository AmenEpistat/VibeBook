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
        <p class="fav-books__title">⭐ {{ status }} ⭐</p>
        <div
            v-for="(row, index) in bookRows"
            :key="index"
            class="fav-books__row"
        >
            <ul class="fav-books__list">
                <li
                    v-for="book in row"
                    :key="book._id"
                    class="fav-books__item"
                >
                    <router-link :to="`/books/${book._id}`">
                        <img
                            class="fav-books__item-img"
                            :src="API_URL + book.cover"
                            :alt="book.title"
                        />
                    </router-link>
                </li>
            </ul>
            <div class="fav-books__shelf" />
            <router-link :to="`/favBooks`">
                <svg
                    width="96"
                    height="64"
                    viewBox="0 0 96 64"
                    class="drop-shadow-sm"
                >
                    <path
                        d="M30 38 L66 38 L63 58 L33 58 Z"
                        fill="#8B4513"
                    />
                    <ellipse
                        cx="48"
                        cy="38"
                        rx="18"
                        ry="3.5"
                        fill="#A0522D"
                    />
                    <ellipse
                        cx="36"
                        cy="26"
                        rx="7"
                        ry="12"
                        fill="#4CAF50"
                        transform="rotate(-20 36 26)"
                    />
                    <ellipse
                        cx="48"
                        cy="21"
                        rx="9"
                        ry="15"
                        fill="#66BB6A"
                    />
                    <ellipse
                        cx="60"
                        cy="26"
                        rx="7"
                        ry="12"
                        fill="#4CAF50"
                        transform="rotate(20 60 26)"
                    />
                    <ellipse
                        cx="48"
                        cy="37"
                        rx="15"
                        ry="3"
                        fill="#5D4037"
                    />
                </svg>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Book } from '@/types/book.ts';
import { API_URL } from '@/apiConfig.ts';
import { computed } from 'vue';

const props = defineProps<{
    books: Book[];
    status: string;
    isFavorite?: boolean;
}>();
const emit = defineEmits(['click']);

const goToPage = () => {
    emit('click');
};

const bookRows = computed(() => {
    const rows: Book[][] = [];

    for (let i = 0; i < props.books.length; i += 4) {
        rows.push(props.books.slice(i, i + 4));
    }

    return rows;
});
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

.fav-books {
    position: relative;
}

.fav-books__row {
    position: relative;

    margin-bottom: 24px;
}

.fav-books__list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 8px;
    row-gap: 160px;

    overflow: hidden;
}

.fav-books__item {
    width: 65px;
    height: 100px;
}

.fav-books__item-img {
    @include boundaries;

    width: 65px;
    height: 100px;
    object-fit: cover;
}

.fav-books__title {
    margin-bottom: 16px;
    text-align: center;

    font-size: 20px;
    font-weight: 600;
    color: $secondary-bg-color;
}

.drop-shadow-sm {
    position: absolute;
    top: 42px;
    right: -20px;
}

.fav-books__shelf {
    position: relative;
    display: block;
    margin-top: 0;
    width: 100%;
    height: 13px;
    background-color: #613232;
}
</style>
