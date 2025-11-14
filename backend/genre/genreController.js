import GenreService from './services/genreService.js';

class GenreController {
    async createGenre (req, res, next) {
        try {
            const { name } = req.body;
            await GenreService.createGenre(name);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }

    async deleteGenre (req, res, next) {
        try {
            const { _id } = req.body;
            await GenreService.deleteGenre(_id);
            return res.status(200);
        } catch (e) {
            next(e);
        }
    }

    async getAllGenres (req, res, next) {
        try {
            const Genres = await GenreService.getAllGenres();
            return res.json({ Genres });
        } catch (e) {
            next(e);
        }
    }
}

export default new GenreController();