import { Book } from '../model/Book.js';
import ApiError from '../../common/exceptions/apiError.js';
import { Author } from '../../author/model/Author.js';
import { Genre } from '../../genre/model/Genre.js';

class BookService {
    async createBook(title, description, author_id, genre_id) {
        const author = await Author.findById({ author_id });
        const genre = await Genre.findById({ genre_id });
        if (!genre || !author) {
            throw ApiError.BadRequest('Ошибка! Проверьте данные');
        }

        await Book.create({ title, description, author, genre });
    }

    async deleteBook(_id) {
        const candidate = await Book.findOne({ _id });
        if (!candidate) {
            throw ApiError.BadRequest('Такой книге нет и в помине!');
        }
        await Book.deleteOne({ _id });
    }

    async getAllBooks () {
        return Book.find();
    }

}

export default new BookService();