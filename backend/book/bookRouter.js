import { Router } from 'express';
import BookController from './bookController.js';

export const router = Router();

router.post('/book', BookController.createBook);
router.delete('/book:id', BookController.deleteBook);
router.get('/books', BookController.getAllBooks);