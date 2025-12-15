import { ref } from 'vue';

export function useRequest<T>() {
    const isLoading = ref(false);
    const errorMessage = ref('');
    const data = ref<T>();

    const fetch = async (fn: (...args: any[]) => Promise<any>, ...args: any[]) => {
        try {
            isLoading.value = true;
            const response = await fn(...args);
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
