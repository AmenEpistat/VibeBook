import { ref } from 'vue';
import { withMinDelay } from '@/utils/delay.ts';
import { useErrorStore } from '@/stores/errorStore.ts';

export function useRequest<T>() {
    const isLoading = ref(false);
    const errorStore = useErrorStore();
    const data = ref<T>();

    const fetch = async (fn: (...args: any[]) => Promise<any>, ...args: any[]) => {
        try {
            isLoading.value = true;
            errorStore.clearError();

            const response = await withMinDelay(() => fn(...args), 1000);
            data.value = response.data;
            return response.data;
        } catch (e: any) {
            const message = e.response?.data?.message || 'Ошибка запроса';
            errorStore.showError(message);
            throw e;
        } finally {
            isLoading.value = false;
        }
    };

    return { isLoading, data, fetch };
}
