import GenreService from './services/genreService.js';

class GenreController {
    async createGenre (req, res, next) {
        try {
            const { name } = req.body;
            await GenreService.createGenre(name);
            return res.json({message: 'Genre successfully created!'});
        } catch (e) {
            next(e);
        }
    }

    async deleteGenre (req, res, next) {
        try {
            const { id } = req.params;
            await GenreService.deleteGenre(id);
            return res.json({message: 'Genre successfully deleted!'});
        } catch (e) {
            next(e);
        }
    }

    async getAllGenres (req, res, next) {
        try {
            const genres = await GenreService.getAllGenres();
            return res.json(genres);
        } catch (e) {
            next(e);
        }
    }
}

export default new GenreController();