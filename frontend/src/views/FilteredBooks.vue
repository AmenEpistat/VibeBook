<template>
    <div class="filtered-books content-wrapper">
        <h2 class="filtered-books__title subtitle">{{ title }}</h2>
        <ul class="filtered-books__list">
            <li
                v-for="i in filteredBooks"
                :key="i.book._id"
                class="filtered-books__item"
            >
                <BookCard
                    :book="i.book"
                    :is-admin="false"
                    :book-state="i.userState"
                    @status-change="onStatusChange"
                    @append-fav="onAppendFav"
                    @append-queue="onAppendQueue"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import BookCard from '@/components/BookCard.vue';
import { useUserBookStore } from '@/stores/userBookStore.ts';
import { computed, onMounted } from 'vue';
import { STATUS_BOOK, type StatusBook } from '@/consts/statusBook.ts';
import { useRoute } from 'vue-router';

const route = useRoute();
const filter = computed(() => route.params.filter as string);

const userBookStore = useUserBookStore();

const filteredBooks = computed(() => {
    switch (filter.value) {
        case 'favorite':
            return books.value.filter((b) => b.userState.isFavorite);

        case 'queue':
            return books.value.filter((b) => b.userState.isQueue);

        default:
            return books.value.filter((b) => b.userState.status === filter.value.toUpperCase());
    }
});

const title = computed(() => {
    if (filter.value === 'favorite') return 'Избранное';
    if (filter.value === 'queue') return 'В очереди';

    return STATUS_BOOK[filter.value.toUpperCase() as keyof typeof STATUS_BOOK];
});

const books = computed(() =>
    userBookStore.userBooks.map((b) => ({
        book: b.book,
        userState: {
            isFavorite: b.isFavorite,
            isQueue: b.isQueue,
            status: b.status,
        },
    })),
);

const onStatusChange = (status: StatusBook, bookId: string) => userBookStore.updateStatus(bookId, status);

const onAppendFav = (bookId: string) => {
    userBookStore.toggleFavorite(bookId);
};

const onAppendQueue = (bookId: string) => userBookStore.toggleQueue(bookId);

onMounted(async () => {
    await userBookStore.getBooks();
});
</script>

<style scoped lang="scss">
.filtered-books__title {
    margin-bottom: 32px;
}

.filtered-books__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}
</style>
