import axios from 'axios';
import { PREFERENCE_QUESTIONS } from '../preferenceConfig.js';
import { Book } from '../../book/model/Book.js';
import BookDto from '../../book/dto/bookDto.js';
import { User } from '../../auth/model/User.js';
import ApiError from '../../common/exceptions/apiError.js';
import { UserRecommend } from '../model/UserRecommend.js';

function encodeAnswers(userAnswersArray) {
    const userAnswers = {};
    for (const a of userAnswersArray) {
        userAnswers[a.questionId] = Array.isArray(a.answer) ? a.answer : [a.answer];
    }

    const vector = [];

    for (const q of PREFERENCE_QUESTIONS) {
        const answers = userAnswers[q.questionId] || [];
        const score = answers.reduce((sum, ans) => {
            const option = q.options.find(o => o.value === ans);
            return sum + (option?.weight ?? 0);
        }, 0);
        vector.push(score);
    }

    return vector;
}

class PreferenceService {
    async recommendBooks(userId, userAnswers) {
        const answers = encodeAnswers(userAnswers);

        const { data } = await axios.post('http://127.0.0.1:5000/predict', { answers });

        const bookIds = data.topBooks.map(b => b.bookId);

        const books = await Book.find({ _id: { $in: bookIds } })
            .populate('author_id', 'name surname')
            .populate('genres_id', 'name');

        const booksMap = new Map(
            books.map(b => [b._id.toString(), b])
        );

        const result = data.topBooks.map(({ bookId, score }) => {
            const book = booksMap.get(bookId);
            if (!book) return null;

            return {
                ...new BookDto(book),
                score
            };
        })
            .filter(Boolean);
        await this.saveRecommendedBooks(userId, result);
        return result;
    }

    async saveRecommendedBooks(userId, books) {
        const user = await User.findById(userId);
        if (!user) throw ApiError.BadRequest('Пользователь не найден');

        for (const b of books) {
            await UserRecommend.findOneAndUpdate(
                { user_id: userId, book_id: b._id },
                { score: b.score, createdAt: new Date() },
                { upsert: true, new: true }
            );
        }
    }

    async getRecommendedBooks(userId) {
        const recs = await UserRecommend.find({ user_id: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'book_id',
                populate: [
                    { path: 'author_id', select: 'name surname' },
                    { path: 'genres_id', select: 'name' },
                ]
            });

        return recs.map(r => ({
            ...new BookDto(r.book_id),
            score: r.score
        }));
    }
}

export default new PreferenceService();
