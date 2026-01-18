import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Book, CreateIBook } from '@/types/book';
import BookService from '@/services/BookService';
import { useUserBookStore } from '@/stores/userBookStore';
import { useRequest } from '@/composables/useRequest.ts';
import type { UserBook } from '@/types/user.ts';

export const useBookStore = defineStore('book', () => {
    const books = ref<Book[]>([]);
    const { isLoading, fetch } = useRequest<UserBook[]>();

    const userBookStore = useUserBookStore();

    const booksWithState = computed(() => {
        return books.value.map((book) => ({
            ...book,
            userState: userBookStore.userBookMap[book._id],
        }));
    });

    const getBooks = async () => {
        books.value = await fetch(BookService.getBooks);
    };

    const getBook = async (id: string) => {
        return await fetch(BookService.getBook, id);
    };

    const createBook = async (book: CreateIBook) => {
        return await fetch(BookService.createBook, book);
    };

    const updateBook = async (book: CreateIBook, id: string) => {
        return await fetch(BookService.updateBook, book, id);
    };

    return { books, booksWithState, isLoading, getBooks, getBook, createBook, updateBook };
});
