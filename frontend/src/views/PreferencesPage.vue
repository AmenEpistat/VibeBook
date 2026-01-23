<template>
    <section class="preferences">
        <div class="preferences__wrapper content-wrapper">
            <h2
                v-if="books.length"
                class="preferences-books__title subtitle"
            >
                Рекомендации для чтения
            </h2>

            <v-btn
                v-if="books.length"
                class="primary-button preferences__button"
                @click="toggleTest"
            >
                {{ showTest ? 'Закрыть' : 'Пройти тест заново' }}
            </v-btn>

            <PreferenceCardsList
                v-if="showTest"
                class="preferences__test"
                :questions="qs"
                @complete="submitQuestion"
            />

            <ul
                v-if="books.length"
                class="preferences-books__list"
            >
                <li
                    v-for="i in books"
                    :key="i.book._id"
                    class="preferences-books__item"
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
        <Loader v-if="isLoading" />
    </section>
</template>

<script setup lang="ts">
import PreferenceCardsList from '@/components/PreferenceCardsList.vue';
import type { Question, UserRecommendBook } from '@/types/preference.ts';
import { usePreferenceStore } from '@/stores/preferenceStore.ts';
import { computed, onMounted, ref } from 'vue';
import BookCard from '@/components/BookCard.vue';
import type { StatusBook } from '@/consts/statusBook.ts';
import { useUserBookStore } from '@/stores/userBookStore.ts';
import Loader from '@/components/Loader.vue';

const preferenceStore = usePreferenceStore();
const userBookStore = useUserBookStore();

const qs = ref<Question[]>([]);
const books = ref<UserRecommendBook[]>([]);
const showTest = ref(true);

const isLoading = computed(() => {
    return preferenceStore.isLoading || userBookStore.isLoading;
});

onMounted(async () => {
    qs.value = await preferenceStore.getQuestions();

    const recommended = await preferenceStore.getRecommendBooks();
    books.value = await userBookStore.getRecommendedWithStatus(recommended);
    showTest.value = books.value.length === 0;
});

const submitQuestion = async () => {
    const recommended = await preferenceStore.submitAnswers(preferenceStore.state.answers);
    books.value = await userBookStore.getRecommendedWithStatus(recommended);
};

const onStatusChange = (status: StatusBook, bookId: string) => userBookStore.updateStatus(bookId, status);

const onAppendFav = (bookId: string) => {
    userBookStore.toggleFavorite(bookId);
};

const onAppendQueue = (bookId: string) => userBookStore.toggleQueue(bookId);

const toggleTest = () => {
    showTest.value = !showTest.value;
};
</script>

<style scoped lang="scss">
.preferences__wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
}

.preferences__button {
    margin-bottom: 32px;
}

.preferences__test {
    grid-column: 1/-1;

    width: 100%;
    margin-bottom: 32px;
}

.preferences-books__title {
    margin-bottom: 32px;
}

.preferences-books__list {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}
</style>
