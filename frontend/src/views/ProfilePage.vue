<template>
    <div class="profile container">
        <v-avatar
            size="100"
            class="user-avatar"
        >
            <v-icon
                color="cyan-darken-2"
                size="140"
            >
                mdi-account-circle
            </v-icon>
        </v-avatar>
        <div class="profile__info-wrapper">
            <h1 class="profile__title">@{{ authStore.user.username }}</h1>
            <v-btn
                variant="plain"
                @click="editProfile"
            >
                <v-icon
                    size="30"
                    left
                    color="grey-darken-1"
                    >mdi-pencil</v-icon
                >
            </v-btn>
            <p class="profile__email">{{ authStore.user.email }}</p>
        </div>
        <StatusBooksItem
            v-if="favoriteBooks.length"
            class="profile__fav-books"
            status="Избранное"
            :books="favoriteBooks"
            is-favorite
        />

        <ul class="profile__books-wrapper">
            <li
                v-for="(staBooks, status) in booksByStatus"
                :key="status"
            >
                <StatusBooksItem
                    :status="STATUS_BOOK[status]"
                    :books="staBooks"
                />
            </li>
            <li v-if="queueBooks.length">
                <StatusBooksItem
                    status="В очереди"
                    :books="queueBooks"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts';
import { computed, onMounted } from 'vue';
import { useUserBookStore } from '@/stores/userBookStore.ts';
import StatusBooksItem from '@/components/StatusBooksItem.vue';
import { STATUS_BOOK, type StatusBook } from '@/consts/statusBook.ts';
import type { Book } from '@/types/book.ts';

const authStore = useAuthStore();
const userBookStore = useUserBookStore();

const books = computed(() => userBookStore.userBooks);
const booksByStatus = computed<Record<StatusBook, Book[]>>(() => {
    return books.value.reduce(
        (acc, ub) => {
            if (!ub.status) return acc;

            if (!acc[ub.status]) {
                acc[ub.status] = [];
            }

            acc[ub.status].push(ub.book);
            return acc;
        },
        {} as Record<StatusBook, Book[]>,
    );
});

const favoriteBooks = computed<Book[]>(() =>
    userBookStore.userBooks.filter((ub) => ub.isFavorite).map((ub) => ub.book),
);

const queueBooks = computed<Book[]>(() => userBookStore.userBooks.filter((ub) => ub.isQueue).map((ub) => ub.book));

onMounted(async () => {
    await userBookStore.getBooks();
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.profile {
    display: grid;
    grid-template-columns: auto 2fr 1fr;
    gap: 40px 16px;
}

.profile__title {
    color: $primary-color;
}

.profile__info-wrapper {
    display: grid;
    grid-template-columns: min-content min-content;
    align-items: center;
}

.profile__icon {
    width: 240px;
    height: 240px;
}

.profile__books-wrapper {
    grid-column: 1/3;

    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;

    padding: 24px;

    border-radius: 8px;
    border: 1px solid #ebebeb;
}

.profile__fav-books {
    grid-column: 3/-1;
    grid-row: 2/3;
}
</style>
