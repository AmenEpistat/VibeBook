import type { UserStatusBook } from '@/types/user.ts';
import type { Book } from '@/types/book.ts';

export interface Option {
    value: string;
    weight: number;
}

export interface Question {
    questionId: string;
    title: string;
    description: string;
    type: 'input' | 'select';
    options?: Option[];
}

export interface PreferenceState {
    currentIndex: number;
    answers: Answer[];
}

export interface Answer {
    answer: string[];
    questionId: string;
}

export interface RecommendBook extends Book {
    score: number;
}

export interface UserRecommendBook extends Pick<RecommendBook, 'score'> {
    userState: UserStatusBook;
    book: Book;
}
