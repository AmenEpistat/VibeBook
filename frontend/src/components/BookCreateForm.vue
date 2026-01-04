<template>
    <v-dialog
        v-model="isActive"
        max-width="600"
    >
        <v-card class="book-create">
            <h2 class="book-create__title">{{ isEditMode ? 'Редактирование книги' : 'Создание книги' }}</h2>
            <v-form
                class="book-form"
                @submit.prevent="submit"
            >
                <v-text-field
                    v-model="form.title"
                    label="Название книги"
                    required
                    variant="outlined"
                />

                <v-textarea
                    v-model="form.description"
                    label="Описание"
                    auto-grow
                    variant="outlined"
                    required
                />

                <v-autocomplete
                    v-model="form.author_id"
                    :items="authors"
                    item-title="name"
                    item-value="_id"
                    label="Автор"
                    clearable
                    required
                    variant="outlined"
                />

                <v-autocomplete
                    v-model="form.genres_id"
                    :items="genres"
                    item-title="name"
                    item-value="_id"
                    label="Жанры"
                    multiple
                    chips
                    clearable
                    variant="outlined"
                    required
                />

                <v-text-field
                    v-model="form.year_publication"
                    type="date"
                    label="Дата публикации"
                    variant="outlined"
                    required
                />

                <v-file-input
                    v-model="form.cover"
                    accept="image/*"
                    label="Обложка книги"
                    required
                    variant="outlined"
                />
            </v-form>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="close">Отмена</v-btn>
                <v-btn
                    class="primary-button"
                    @click="submit"
                >
                    {{ isEditMode ? 'Сохранить' : 'Создать' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useAuthorStore } from '@/stores/authorStore.ts';
import { useGenreStore } from '@/stores/genreStore.ts';
import { useBookStore } from '@/stores/bookStore.ts';
import type { Author } from '@/types/author.ts';
import type { Genre } from '@/types/genre.ts';
import type { Book } from '@/types/book.ts';

interface Props {
    book?: Book;
    modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'saved']);

const isActive = ref(props.modelValue);

watch(
    () => props.modelValue,
    (v) => (isActive.value = v),
);

watch(isActive, (v) => emit('update:modelValue', v));

const isEditMode = ref(!!props.book);

const form = ref({
    title: '',
    description: '',
    author_id: null,
    genres_id: [],
    year_publication: '',
    cover: null,
});

const authors = ref<Author[]>([]);
const genres = ref<Genre[]>([]);

const authorStore = useAuthorStore();
const genreStore = useGenreStore();
const bookStore = useBookStore();

onMounted(() => {
    loadAuthors();
    loadGenres();

    if (props.book) {
        form.value.title = props.book.title;
        form.value.description = props.book.description || '';
        form.value.author_id = props.book.author._id as string;
        form.value.genres_id = props.book.genres.map((g) => g._id);
        form.value.year_publication = props.book.year_publication + '-01-01';
    }
});

const loadAuthors = async () => {
    authors.value = await authorStore.getAuthors();
};

const loadGenres = async () => {
    genres.value = await genreStore.getGenres();
};

const close = () => {
    isActive.value = false;
};

const submit = async () => {
    const fd = new FormData();

    fd.append('title', form.value.title);
    fd.append('description', form.value.description);
    fd.append('author_id', form.value.author_id);
    fd.append('year_publication', form.value.year_publication);

    form.value.genres_id.forEach((id) => fd.append('genres_id', id));

    if (form.value.cover) {
        fd.append('cover', form.value.cover);
    }

    try {
        if (isEditMode.value && props.book?._id) {
            console.log(fd);
            await bookStore.updateBook(fd, props.book?._id);
        } else {
            await bookStore.createBook(fd);
        }
        close();
        emit('saved');
    } catch (e) {
        alert(e.message);
    }
};
</script>

<style>
.book-create__title {
    margin-bottom: 16px;
}

.book-create {
    padding: 24px;
}

.v-input__prepend {
    display: none;
}
</style>
