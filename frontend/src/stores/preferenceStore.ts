import { defineStore } from 'pinia';
import type { Answer, PreferenceState } from '@/types/preference.ts';
import { ref } from 'vue';
import PreferenceService from '@/services/PreferenceService.ts';

export const usePreferenceStore = defineStore('preferences', () => {
    const state = ref<PreferenceState>({
        currentIndex: 0,
        answers: [],
    });
    const isLoading = ref(false);
    const errorMessage = ref('');

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
        try {
            isLoading.value = true;
            await PreferenceService.sendAnswers(answers);
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const getQuestions = async () => {
        try {
            isLoading.value = true;
            const response = await PreferenceService.getQuestions();
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { state, setAnswer, setNextIndex, submitAnswers, errorMessage, isLoading, getQuestions };
});
