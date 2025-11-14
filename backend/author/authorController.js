import authorService from './services/authorService.js';

class AuthorController {
    async createAuthor (req, res, next) {
        try {
            const { name, surname } = req.body;
            await authorService.createAuthor(name, surname);
            return res.json({message: 'Author successfully created!'});
        } catch (e) {
            next(e);
        }
    }

    async deleteAuthor (req, res, next) {
        try {
            const { id } = req.params;
            await authorService.deleteAuthor(id);
            return res.json({message: 'Author successfully deleted!'});
        } catch (e) {
            next(e);
        }
    }

    async getAllAuthors (req, res, next) {
        try {
            const authors = await authorService.getAllAuthors();
            return res.json(authors);
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthorController();