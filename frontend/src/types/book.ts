import type { Genre } from '@/types/genre.ts';
import type { Author } from '@/types/author.ts';

export interface Book {
    _id?: string | number;
    title: string;
    author: Author;
    cover?: string;
    description?: string;
    genres: Genre[];
    year_publication: Date | null;
}

export interface CreateIBook extends Omit<Book, 'genres'> {
    genres_id?: string | number;
}
