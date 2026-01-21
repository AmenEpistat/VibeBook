<template>
    <div class="form-card">
        <p
            v-if="isRequired"
            class="form-card__required-text"
        >
            * Обязательное поле
        </p>
        <h3 class="form-card__title">{{ question.title }}</h3>
        <p class="form-card__description">{{ question.description }}</p>
        <div class="form-card__input">
            <v-text-field
                v-if="question.type === 'input'"
                v-model="answer"
                variant="outlined"
            />
            <v-autocomplete
                v-if="question.type === 'select'"
                v-model="answer"
                :items="options"
                multiple
                chips
                clearable
                variant="outlined"
                required
            />
        </div>
        <v-btn
            rounded="xs"
            class="primary-button"
            @click="onClick"
            >{{ buttonText }}</v-btn
        >
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Option, Question } from '@/types/preference.ts';

const props = defineProps<{
    isRequired: boolean;
    question: Question;
    buttonText: string;
}>();

const emit = defineEmits<{
    (e: 'click', answer: string | string[] | null): void;
}>();

const options = computed(() => props.question.options?.map((option: Option) => option.value));

const onClick = () => {
    emit('click', answer.value);
    answer.value = null;
};

const answer = ref<string | string[] | null>(null);
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/variables' as *;

.form-card {
    @include boundaries;

    width: clamp(300px, 80%, 800px);
    padding: 20px;

    border-radius: 10px;
}

.form-card__required-text {
    margin-bottom: 15px;

    font-size: 16px;
}

.form-card__title {
    font-size: 22px;
}

.form-card__description {
    margin-bottom: 15px;

    color: $secondary-color;
}
</style>
