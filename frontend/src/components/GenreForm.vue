<template>
    <v-dialog
        v-model="isActive"
        max-width="800"
    >
        <v-card class="genre-form">
            <h3 class="genre-form__title">{{ isEditMode ? 'Редактирование жанра' : 'Добавление жанра' }}</h3>
            <v-form>
                <v-text-field
                    v-model="form.name"
                    label="Название жанра"
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
import type { Genre } from '@/types/genre.ts';
import { onMounted, ref, watch } from 'vue';
import { useGenreStore } from '@/stores/genreStore.ts';

interface props {
    modelValue: boolean;
    genre?: Genre;
}

const props = defineProps<props>();
const emit = defineEmits(['update:modelValue', 'saved']);

const isActive = ref(props.modelValue);
const isEditMode = ref(!!props.genre);

const genreStore = useGenreStore();

const form = ref<Genre>({
    name: '',
});

onMounted(() => {
    if (props.genre) {
        form.value.name = props.genre.name;
    }
});

watch(
    () => props.modelValue,
    (v) => (isActive.value = v),
);

watch(isActive, (v) => emit('update:modelValue', v));

const close = () => {
    isActive.value = false;
};

const submit = async () => {
    if (!isEditMode.value) {
        await genreStore.createGenre(form.value);

        emit('saved');

        form.value.name = '';

        close();
    }
};
</script>

<style scoped lang="scss">
.genre-form {
    padding: 24px;
}

.genre-form__title {
    margin-bottom: 16px;
}
</style>
