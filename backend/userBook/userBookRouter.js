import { Router } from 'express';
import UserBookController from './userBookController.js';

export const router = Router();

router.get('/user/books', UserBookController.getUserBooks);
router.post('/user/books', UserBookController.addUserBook);