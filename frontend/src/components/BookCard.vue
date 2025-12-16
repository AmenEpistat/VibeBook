<template>
    <div class="book-card">
        <img
            class="book-card__img"
            :src="API_URL + book?.cover"
            :alt="book?.title"
            width="160"
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
            <UserActionSelect
                :status-state="bookState"
                @onselect="handleSelect"
                @append-fav="appendFav"
                @append-queue="appendQueue"
            />
            <v-btn
                class="book-card__edit-button plain-button"
                variant="plain"
                @click="isActive = true"
            >
                Редактировать
            </v-btn>
        </div>
        <BookCreateForm
            v-model="isActive"
            :book="book"
            @saved="editBook"
        />
    </div>
</template>

<script setup lang="ts">
import type { Book } from '@/types/book.ts';
import GenreItem from '@/components/GenreItem.vue';
import UserActionSelect from '@/components/UserActionSelect.vue';
import { API_URL } from '@/apiConfig.ts';
import { computed, ref } from 'vue';
import BookCreateForm from '@/components/BookCreateForm.vue';
import AdminAction from '@/components/AdminAction.vue';
import type { StatusBook } from '@/consts/statusBook.ts';
import type { UserStatusBook } from '@/types/user.ts';

const props = defineProps<{
    book: Book;
    bookState?: UserStatusBook;
    isAdmin: boolean;
}>();

const emit = defineEmits<{
    (e: 'statusChange', status: StatusBook, id: string): void;
    (e: 'append-fav', id: string): void;
    (e: 'append-queue', id: string): void;
    (e: 'editBook'): void;
}>();

const handleSelect = (status: StatusBook) => {
    emit('statusChange', status, props.book._id);
};

const appendFav = () => {
    emit('append-fav', props.book._id);
};

const appendQueue = () => {
    emit('append-queue', props.book._id);
};

const editBook = () => {
    emit('editBook');
};

const isActive = ref(false);
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.book-card {
    display: grid;
    grid-template-columns: 160px 5fr 3fr;
    align-items: stretch;

    min-height: 200px;
    max-height: 250px;

    overflow: hidden;
}

.book-card__img {
    display: flex;
    align-items: stretch;

    object-fit: cover;
    overflow: hidden;

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
    display: grid;
    grid-template-columns: 1fr;
    align-items: flex-end;

    padding: 16px;

    border: 1px solid $light-border-color;
    border-radius: 5px;
    border-left: none;

    .select {
        flex-grow: 0;
    }
}

.book-card__edit-button {
    font-size: 12px;
}

.book-card__genres {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    row-gap: 8px;

    margin-top: 20px;
}
</style>
