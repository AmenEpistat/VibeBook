import bookService from './services/bookService.js';

class BookController {
    async createBook (req, res, next) {
        try {
            const { title, description, author_id } = req.body;
            console.log("FILE:", req.file);

            const cover = req.file ? `/uploads/covers/${req.file.filename}` : null;
            const genres_id = Array.isArray(req.body.genres_id)
                ? req.body.genres_id
                : Object.values(req.body).filter((v, key) => key.startsWith("genres_id"));

            console.log(req.body);

            await bookService.createBook(title, description, author_id, genres_id, cover);
            return res.json({message: 'Книга создана!'});
        } catch (e) {
            next(e);
        }
    }

    async updateBook (req, res, next) {
        try {
            const { title, description, author_id, genres_id, _id  } = req.body;
            await bookService.updateBook(title, description, author_id, genres_id, _id);
            return res.json({message: 'Книга обновлена!'});
        } catch (e) {
            next(e);
        }
    }

    async deleteBook (req, res, next) {
        try {
            const { id } = req.params;
            await bookService.deleteBook(id);
            return res.json({message: 'Книга удалена!'});
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
            const { id } = req.params;
            const book = await bookService.getBookById(id);
            return res.json(book);
        } catch (e) {
            next(e);
        }
    }
}

export default new BookController();