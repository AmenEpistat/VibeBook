export interface Question {
    id: string;
    title: string;
    description: string;
    type: 'input' | 'select';
    options?: string[];
}

export interface PreferenceState {
    currentIndex: number;
    answers: Answer[];
}

export interface Answer {
    answer: string;
    questionId: string;
}
