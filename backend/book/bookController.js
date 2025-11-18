import bookService from './services/bookService.js';

class BookController {
    async createBook (req, res, next) {
        try {
            const { title, description, author_id, genres_id  } = req.body;
            await bookService.createBook(title, description, author_id, genres_id);
            return res.json({message: 'Book successfully created!'});
        } catch (e) {
            next(e);
        }
    }

    async deleteBook (req, res, next) {
        try {
            const { id } = req.params;
            await bookService.deleteBook(id);
            return res.json({message: 'Book successfully deleted!'});
        } catch (e) {
            next(e);
        }
    }

    async getAllBooks (req, res, next) {
        try {
            const books = await bookService.getAllBooks();
            return res.json(books);
        } catch (e) {
            next(e);
        }
    }

    async getBookById (req, res, next) {
        try {
            console.log(req.params);
            const { id } = req.params;
            const book = await bookService.getBookById(id);
            return res.json(book);
        } catch (e) {
            next(e);
        }
    }
}

export default new BookController();