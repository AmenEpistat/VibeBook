import type { Genre } from '@/types/genre.ts';
import type { Author } from '@/types/author.ts';

export interface Book {
    _id?: string | number;
    title: string;
    author: Author;
    image_path?: string;
    description?: string;
    genres: Genre[];
}
