import { Router } from 'express';
import GenreController from './genreController.js';

export const router = Router();

router.post('/genre', GenreController.createGenre);
router.delete('/genre:id', GenreController.deleteGenre);
router.get('/genres', GenreController.getAllGenres);