import UserBookService from './services/userBookService.js';

class UserBookController {
    async addUserBook(req, res, next) {
        try {
            const user_id = req.user.id;
            const { book_id, status, isFavorite } = req.body;

            await UserBookService.addUserBook(user_id, book_id, status, isFavorite);

            return res.json({message: 'ok'});
        } catch (e) {
            next(e);
        }
    }

    async getUserBooks(req, res, next) {
        try {
            const user_id = req.user.id;
            const books = await UserBookService.getUserBooks(user_id);

            return res.json(books)
        } catch (e) {
            next(e);
        }
    }
}

export default new UserBookController();