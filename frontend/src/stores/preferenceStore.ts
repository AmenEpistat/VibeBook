import { defineStore } from 'pinia';
import type { Answer, PreferenceState } from '@/types/preference.ts';
import { ref } from 'vue';
import PreferenceService from '@/services/PreferenceService.ts';
import { useRequest } from '@/composables/useRequest.ts';

export const usePreferenceStore = defineStore('preferences', () => {
    const state = ref<PreferenceState>({
        currentIndex: 0,
        answers: [],
    });
    const { isLoading, errorMessage, data, fetch } = useRequest<any>();

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

    const submitAnswers = async (answers: Answer[]) => {
        return await fetch(PreferenceService.sendAnswers, answers);
    };

    const getQuestions = async () => {
        return await fetch(PreferenceService.getQuestions);
    };

    return { state, setAnswer, setNextIndex, submitAnswers, errorMessage, isLoading, getQuestions };
});
