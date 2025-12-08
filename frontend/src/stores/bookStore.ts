import { defineStore } from 'pinia';
import type { Book, CreateIBook } from '@/types/book.ts';
import { ref } from 'vue';
import BookService from '@/services/BookService.ts';

export const useBookStore = defineStore('book', () => {
    const books = ref<Book[]>([]);
    const isLoading = ref(true);
    const errorMessage = ref('');

    const getBooks = async () => {
        try {
            const response = await BookService.getBooks();
            books.value = response.data;
            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const getBook = async (id: string) => {
        try {
            isLoading.value = true;
            const response = await BookService.getBook(id);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    const createBook = async (book: CreateIBook) => {
        try {
            isLoading.value = true;
            const response = await BookService.createBook(book);
            return response.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            errorMessage.value = e.response?.data?.message;
        } finally {
            isLoading.value = false;
        }
    };

    return { books, isLoading, errorMessage, getBooks, getBook };
});
