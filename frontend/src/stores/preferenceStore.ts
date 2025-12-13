import { defineStore } from 'pinia';
import type { PreferenceState } from '@/types/preference.ts';
import { ref } from 'vue';

export const usePreferenceStore = defineStore('preferences', () => {
    const state = ref<PreferenceState>({
        currentIndex: 0,
        answers: [],
    });

    const setAnswer = (index: string, answer: string) => {
        state.value.answers.push({
            questionId: index,
            answer: answer,
        });
    };

    const setNextIndex = (total: number) => {
        if (state.value.currentIndex < total - 1) {
            state.value.currentIndex++;
        }
    };

    const submitAnswers = async () => {};

    return { state, setAnswer, setNextIndex, submitAnswers };
});
