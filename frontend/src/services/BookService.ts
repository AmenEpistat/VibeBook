import type { Book } from '@/types/book.ts';
import { $api } from '@/http/apiConfig.ts';

export default class BookService {
    static async createBook(book: Book) {
        return $api.post('/api/book', book);
    }
    static async deleteBook(id: number) {
        return $api.delete(`/api/book/${id}`);
    }
    static async getBooks() {
        console.log('ff');
        return $api.get('/api/books');
    }
}
