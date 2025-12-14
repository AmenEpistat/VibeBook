export const STATUS_BOOK = {
    COMPLETED: 'Прочитана',
    QUEUE: 'В очередь',
    READING: 'Читаю',
    REMOVE: 'Удалить',
} as const;

export type StatusBook = keyof typeof STATUS_BOOK;
