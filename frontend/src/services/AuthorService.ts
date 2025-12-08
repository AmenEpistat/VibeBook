import { $api } from '@/apiConfig.ts';
import type { Author } from '@/types/author.ts';

export default class AuthorService {
    static async createAuthor(author: Author) {
        return $api.post('/api/author', author);
    }

    static async deleteAuthor(id: string) {
        return $api.delete(`/api/author/${id}`);
    }

    static async getAuthors() {
        return $api.get('/api/authors');
    }
}
