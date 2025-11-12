import { Router } from 'express';
import AuthorController from './authorController.js';

export const router = Router();

router.post('/author', AuthorController.createAuthor);
router.delete('/author:id', AuthorController.deleteAuthor);
router.get('/authors', AuthorController.getAllAuthors);