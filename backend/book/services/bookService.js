import { Book } from '../model/Book.js';
import ApiError from '../../common/exceptions/apiError.js';
import { Author } from '../../author/model/Author.js';
import { Genre } from '../../genre/model/Genre.js';
import BookDto from '../dto/bookDto.js';

class BookService {
    async createBook(title, description, author_id, genres_id, cover, year_publication) {
        const author = await Author.findById(author_id);
        if (!author) {
            throw ApiError.BadRequest('Автор не найден');
        }

        const genres = await Genre.find({ _id: { $in: genres_id } });
        if (genres.length !== genres_id.length) {
            throw ApiError.BadRequest('Некоторые жанры не найдены');
        }

        await Book.create({ title, description, author_id, genres_id, cover, year_publication });
    }

    async updateBook(title, description, author_id, genres_id, _id, cover, year_publication) {
        const [author, genres, book] = await Promise.all([
            Author.findById(author_id),
            Genre.find({ _id: { $in: genres_id } }),
            Book.findById(_id)
        ]);

        if (!author) throw ApiError.BadRequest('Автор не найден');
        if (genres.length !== genres_id.length) throw ApiError.BadRequest('Некоторые жанры не найдены');
        if (!book) throw ApiError.BadRequest('Книга не найдена');

        await Book.findByIdAndUpdate(_id, { title, description, author_id, genres_id, cover, year_publication }, { new: true });
    }

    async deleteBook(_id) {
        const candidate = await Book.findOne({ _id });
        if (!candidate) {
            throw ApiError.BadRequest('Такой книге нет и в помине!');
        }
        await Book.deleteOne({ _id });
    }

    async getAllBooks () {
        const books = await Book.find()
            .populate('author_id', 'name surname')
            .populate('genres_id', 'name');
        return books.map(book => new BookDto(book));
    }

    async getBookById (id) {
        const book = await Book.findById(id)
            .populate('author_id', 'name surname')
            .populate('genres_id', 'name');

        if (!book) {
            ApiError.BadRequest('Книга не найдена' );
        }
        return new BookDto(book);
    }

}

export default new BookService();