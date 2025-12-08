import type { CreateIBook } from '@/types/book.ts';
import { $api } from '@/apiConfig.ts';

export default class BookService {
    static async createBook(book: CreateIBook) {
        return $api.post('/api/book', book, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async updateBook(book: CreateIBook, id: string) {
        return $api.put(`/api/book/${id}`, book, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static async deleteBook(id: number) {
        return $api.delete(`/api/book/${id}`);
    }
    static async getBooks() {
        return $api.get('/api/books');
    }
    static async getBook(id: string) {
        return $api.get(`/api/books/${id}`);
    }
}
