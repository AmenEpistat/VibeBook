import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
    const message = ref<string | null>(null);
    const isVisible = ref(false);

    const showError = (msg: string) => {
        message.value = msg;
        isVisible.value = true;
    };

    const clearError = () => {
        message.value = null;
        isVisible.value = false;
    };

    return { message, isVisible, showError, clearError };
});
