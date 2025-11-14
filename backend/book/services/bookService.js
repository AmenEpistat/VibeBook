import { Book } from '../model/Book.js';
import ApiError from '../../common/exceptions/apiError.js';
import { Author } from '../../author/model/Author.js';
import { Genre } from '../../genre/model/Genre.js';

class BookService {
    async createBook(title, description, author_id, genres_id) {
        const author = await Author.findById(author_id);
        if (!author) {
            throw ApiError.BadRequest('Автор не найден');
        }

        const genres = await Genre.find({ _id: { $in: genres_id } });
        if (genres.length !== genres_id.length) {
            throw ApiError.BadRequest('Некоторые жанры не найдены');
        }

        await Book.create({ title, description, author_id, genres_id });
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