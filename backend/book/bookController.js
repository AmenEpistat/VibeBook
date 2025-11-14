import bookService from './services/bookService.js';

class BookController {
    async createBook (req, res, next) {
        try {
            const { title, description, author_id, genre_id  } = req.body;
            await bookService.createBook(title, description, author_id, genre_id);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }

    async deleteBook (req, res, next) {
        try {
            const { _id } = req.body;
            await bookService.deleteBook(_id);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }

    async getAllBooks (req, res, next) {
        try {
            const books = await bookService.getAllBooks();
            return res.json({ books });
        } catch (e) {
            next(e);
        }
    }
}

export default new BookController();