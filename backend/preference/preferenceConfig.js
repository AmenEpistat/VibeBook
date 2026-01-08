export const PREFERENCE_QUESTIONS = [
    {
        id: 'genre',
        title: 'Любимый жанр',
        description: 'Выберите основной жанр',
        type: 'select',
        options: [
            { value: 'Fantasy', weight: 2 },
            { value: 'Sci-Fi', weight: 2 },
            { value: 'Drama', weight: 1 },
            { value: 'Horror', weight: 1 },
        ],
    },
    {
        id: 'mood',
        title: 'Настроение книги',
        description: 'Какое настроение вам ближе?',
        type: 'select',
        options: [
            { value: 'Light', weight: -1 },
            { value: 'Neutral', weight: 0 },
            { value: 'Dark', weight: 1 },
        ],
    },
    {
        id: 'length',
        title: 'Объём книги',
        description: 'Предпочтительная длина',
        type: 'select',
        options: [
            { value: 'Short', weight: -1 },
            { value: 'Medium', weight: 0 },
            { value: 'Long', weight: 1 },
        ],
    },
];
