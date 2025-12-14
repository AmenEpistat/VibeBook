import type { StatusBook } from '@/consts/statusBook.ts';
import type { Book } from '@/types/book.ts';

export interface UserActionBook {
    book_id: string;
    status: StatusBook;
    isFavorite: boolean;
}

export interface UserBook extends Omit<UserActionBook, 'book_id'> {
    book: Book;
}
