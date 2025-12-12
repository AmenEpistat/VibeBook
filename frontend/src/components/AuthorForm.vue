<template>
    <v-dialog
        v-model="isActive"
        max-width="800"
    >
        <v-card>
            <h3 class="author-form__title">{{ isEditMode ? 'Редактирование автора' : 'Добавление автора' }}</h3>
            <v-form>
                <v-text-field
                    v-model="form.name"
                    label="Имя автора"
                    required
                    variant="outlined"
                />

                <v-text-field
                    v-model="form.surname"
                    label="Фамилия автора"
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
import type { Author } from '@/types/author.ts';
import { onMounted, ref, watch } from 'vue';
import { useAuthorStore } from '@/stores/authorStore.ts';

interface props {
    modelValue: boolean;
    author?: Author;
}

const props = defineProps<props>();
const emit = defineEmits(['update:modelValue', 'saved']);

const isActive = ref(props.modelValue);
const isEditMode = ref(!!props.author);

const authorStore = useAuthorStore();

const form = ref<Author>({
    name: '',
    surname: '',
});

onMounted(() => {
    if (props.author) {
        form.value.name = props.author.name;
        form.value.surname = props.author.surname;
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
        await authorStore.createAuthor(form.value);

        emit('saved');

        form.value.name = '';
        form.value.surname = '';

        close();
    }
};
</script>

<style scoped lang="scss"></style>
