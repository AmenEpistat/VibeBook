import { Router } from 'express';
import preferenceController from './preferenceController.js';

export const router = Router();

router.get('/questions', preferenceController.getQuestions);
router.post('/answers', preferenceController.sendAnswers);