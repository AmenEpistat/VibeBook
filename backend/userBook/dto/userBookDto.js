import BookDto from '../../book/dto/bookDto.js';

export default class UserBookDto {
    book;
    isFavorite;
    status;
    isQueue;

    constructor(model) {
        this.book = new BookDto(model.book_id);
        this.isFavorite = model.isFavorite;
        this.status = model.status;
        this.isQueue = model.isQueue;
    }
}