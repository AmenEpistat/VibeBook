export const STATUS_BOOK = {
    COMPLETED: 'Прочитана',
    READING: 'Читаю',
    PROCESS: 'Не закончена',
} as const;

export type StatusBook = keyof typeof STATUS_BOOK;
