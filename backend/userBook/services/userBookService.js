import ApiError from '../../common/exceptions/apiError.js';
import { User } from '../../auth/model/User.js';
import { Book } from '../../book/model/Book.js';
import { UserBook } from '../model/UserBook.js';
import UserBookDto from '../dto/userBookDto.js';

class UserBookService {
    async addUserBook(user_id, book_id, status, isFavorite, isQueue) {
        const user = await User.findById(user_id);
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }

        const book = await Book.findById(book_id);
        if (!book) {
            throw ApiError.BadRequest('Книга не найдена');
        }

        const userBook = {
            isFavorite,
            isQueue,
        }

        if (status) {
            userBook.status = status;
        }

        await UserBook.findOneAndUpdate(
            { user_id: user_id, book_id: book_id },
            userBook,
            { upsert: true, new: true }
        );
    }
    async getUserBooks(user_id) {
        const user = await User.findById(user_id);
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }

        const books = await UserBook.find({ user_id }).populate({
            path: 'book_id',
            populate: [
                { path: 'author_id', select: 'name surname' },
                { path: 'genres_id', select: 'name' },
            ]
        });
        return books.map(book => new UserBookDto(book));
    }
}

export default new UserBookService();