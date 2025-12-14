import ApiError from '../../common/exceptions/apiError.js';
import { User } from '../../auth/model/User.js';
import { Book } from '../../book/model/Book.js';
import { UserBook } from '../model/UserBook.js';

class UserBookService {
    async addUserBook(user_id, book_id, status, isFavorite) {
        const user = await User.findById(user_id);
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }

        const book = await Book.findById(book_id);
        if (!book) {
            throw ApiError.BadRequest('Книга не найдена');
        }

        await UserBook.findOneAndUpdate(
            { user_id: user_id, book_id: book_id },
            { status, isFavorite },
            { upsert: true, new: true }
        );
    }
    async getUserBooks(user_id) {
        const user = await User.findById(user_id);
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }

        return UserBook.find({ user_id }).populate('book_id');
    }
}

export default new UserBookService();