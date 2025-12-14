import type { UserActionBook } from '@/types/user.ts';
import { $api } from '@/apiConfig.ts';

export default class UserBookService {
    static async addBook(userBook: UserActionBook) {
        return $api.post('/api/user/books', userBook);
    }

    static async getUserBook() {
        return $api.get('/api/user/books');
    }
}
