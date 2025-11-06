<template>
    <FormCard
        v-if="currentQuestion"
        is-required
        :question="currentQuestion"
        :button-text="isLast ? 'Завершить' : 'Продолжить'"
        @click="onClick"
    />
</template>

<script setup lang="ts">
import FormCard, { type IQuestion } from '@/components/FormCard.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    questions: IQuestion[];
}>();

const emit = defineEmits<{
    (e: 'complete'): void;
}>();

const currentIndex = ref(0);

const currentQuestion = computed(() => props.questions[currentIndex.value]);
const isLast = computed(() => currentIndex.value === props.questions.length - 1);

const onClick = () => {
    if (!isLast.value) {
        currentIndex.value++;
    } else {
        emit('complete');
    }
};
</script>

<style scoped></style>
