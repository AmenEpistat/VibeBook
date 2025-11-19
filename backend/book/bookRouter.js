import { Router } from 'express';
import BookController from './bookController.js';
import { upload } from '../common/multerConfig.js';

export const router = Router();

router.post('/book', upload.single("cover"), BookController.createBook);
router.put('/book', BookController.updateBook);
router.delete('/book/:id', BookController.deleteBook);
router.get('/books/:id', BookController.getBookById);
router.get('/books', BookController.getAllBooks);