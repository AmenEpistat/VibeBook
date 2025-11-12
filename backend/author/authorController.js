import authorService from './services/authorService.js';

class AuthorController {
    async createAuthor (req, res, next) {
        try {
            const { name } = req.body;
            await authorService.createAuthor(name);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }

    async deleteAuthor (req, res, next) {
        try {
            const { _id } = req.body;
            await authorService.deleteAuthor(_id);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }

    async getAllAuthors (req, res, next) {
        try {
            const authors = await authorService.getAllAuthors();
            return res.json({ authors });
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthorController();