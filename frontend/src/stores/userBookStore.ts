import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserActionBook, UserBook, UserStatusBook } from '@/types/user';
import UserBookService from '@/services/UserBookService';
import { useRequest } from '@/composables/useRequest';
import type { StatusBook } from '@/consts/statusBook.ts';

export const useUserBookStore = defineStore('userBook', () => {
    const userBooks = ref<UserBook[]>([]);

    const { isLoading, errorMessage, fetch } = useRequest<UserBook[]>();

    const userBookMap = computed<Record<string, UserStatusBook>>(() => {
        return userBooks.value.reduce(
            (acc, ub) => {
                acc[ub.book._id] = {
                    isFavorite: ub.isFavorite,
                    status: ub.status,
                    isQueue: ub.isQueue,
                };
                return acc;
            },
            {} as Record<string, UserStatusBook>,
        );
    });

    const getBooks = async () => {
        userBooks.value = await fetch(UserBookService.getUserBook);
    };

    const getCurrentState = (id: string): UserStatusBook =>
        userBookMap.value[id] ?? {
            isFavorite: false,
            isQueue: false,
            status: undefined,
        };

    const toggleFavorite = async (id: string) => {
        const current = getCurrentState(id);
        await fetch(UserBookService.addBook, {
            book_id: id,
            isFavorite: !current.isFavorite,
            isQueue: current.isQueue,
            status: current.status,
        });
        await getBooks();
    };

    const toggleQueue = async (id: string) => {
        const current = getCurrentState(id);
        await fetch(UserBookService.addBook, {
            book_id: id,
            isFavorite: current.isFavorite,
            isQueue: !current.isQueue,
            status: current.status,
        });
        await getBooks();
    };

    const updateStatus = async (bookId: string, status: StatusBook) => {
        const current = getCurrentState(bookId);
        await fetch(UserBookService.addBook, {
            book_id: bookId,
            isFavorite: current.isFavorite,
            isQueue: current.isQueue,
            status,
        });
        await getBooks();
    };

    const addBook = async (userBook: UserActionBook) => {
        return await fetch(UserBookService.addBook, userBook);
    };

    return {
        userBooks,
        userBookMap,
        isLoading,
        errorMessage,
        getBooks,
        addBook,
        toggleQueue,
        toggleFavorite,
        updateStatus,
    };
});
