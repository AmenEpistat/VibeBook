import { $api } from '@/apiConfig.ts';
import type { Genre } from '@/types/genre.ts';

export default class GenreService {
    static async createGenre(genre: Genre) {
        return $api.post('/api/genre', genre);
    }

    static async deleteGenre(id: string) {
        return $api.delete(`/api/genre/${id}`);
    }

    static async getGenres() {
        return $api.get('/api/genres');
    }
}
