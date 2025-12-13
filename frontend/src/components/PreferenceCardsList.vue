<template>
    <PreferenceCard
        v-if="currentQuestion"
        is-required
        :question="currentQuestion"
        :button-text="isLast ? 'Завершить' : 'Продолжить'"
        @click="onClick"
    />
</template>

<script setup lang="ts">
import PreferenceCard from '@/components/PreferenceCard.vue';
import { computed } from 'vue';
import type { Question } from '@/types/preference.ts';
import { usePreferenceStore } from '@/stores/preferenceStore.ts';

const props = defineProps<{
    questions: Question[];
}>();

const emit = defineEmits<{
    (e: 'complete'): void;
}>();

const store = usePreferenceStore();

const currentQuestion = computed(() => props.questions[store.state.currentIndex]);
const isLast = computed(() => store.state.currentIndex === props.questions.length - 1);

const onClick = async (answer: string) => {
    if (currentQuestion.value) {
        store.setAnswer(currentQuestion.value.id, answer);
    }

    if (!isLast.value) {
        store.setNextIndex(props.questions.length);
    } else {
        emit('complete');
    }
};
</script>

<style scoped></style>
