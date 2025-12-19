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
            <UserActionSelect
                :status-state="userState"
                @onselect="handleSelect"
                @append-fav="onAppendFav"
                @append-queue="onAppendQueue"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useBookStore } from '@/stores/bookStore';
import { useUserBookStore } from '@/stores/userBookStore';
import type { StatusBook } from '@/consts/statusBook';
import { API_URL } from '@/apiConfig.ts';
import GenreItem from '@/components/GenreItem.vue';
import UserActionSelect from '@/components/UserActionSelect.vue';
import type { Book } from '@/types/book.ts';

const route = useRoute();
const bookId = computed(() => String(route.params.id));

const bookStore = useBookStore();
const userBookStore = useUserBookStore();

const book = ref<Book>();
const userState = computed(() => userBookStore.userBookMap[bookId.value]);

const handleSelect = (status: StatusBook) => userBookStore.updateStatus(bookId.value, status);

const onAppendFav = () => userBookStore.toggleFavorite(bookId.value);

const onAppendQueue = () => userBookStore.toggleQueue(bookId.value);

onMounted(async () => {
    await userBookStore.getBooks();
    book.value = await bookStore.getBook(bookId.value);
});
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
    gap: 16px;

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
