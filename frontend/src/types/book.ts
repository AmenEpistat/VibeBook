import type { Genre } from '@/types/genre.ts';
import type { Author } from '@/types/author.ts';

export interface Book {
    _id: string;
    title: string;
    author: Author;
    cover?: File | null | string;
    description?: string;
    genres: Genre[];
    year_publication: Date | null;
}

export interface CreateIBook extends Omit<Book, 'genres' | 'author' | '_id'> {
    author_id: string;
    genres_id: string[];
}
