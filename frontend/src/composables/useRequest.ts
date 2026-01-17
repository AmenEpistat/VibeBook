import { ref } from 'vue';
import { withMinDelay } from '@/utils/delay.ts';

export function useRequest<T>() {
    const isLoading = ref(false);
    const errorMessage = ref<string | null>(null);
    const data = ref<T>();

    const fetch = async (fn: (...args: any[]) => Promise<any>, ...args: any[]) => {
        try {
            errorMessage.value = null;
            isLoading.value = true;

            const response = await withMinDelay(() => fn(...args), 1000);
            data.value = response.data;
            return response.data;
        } catch (e: any) {
            errorMessage.value = e.response?.data?.message || 'Ошибка запроса';
            throw e;
        } finally {
            isLoading.value = false;
        }
    };

    return { isLoading, errorMessage, data, fetch };
}
