import { Router } from 'express';
import { authController } from './authController.js';
import { check } from 'express-validator';
import { authMiddleware } from './middleware/authMiddleware.js';
import { roleMiddleware } from './middleware/roleMiddleware.js';

export const router = new Router();
const controller = new authController();

router.post('/registration',[
	check('email', 'Имя не может быть пустым').notEmpty(),
	check('password', 'Пароль не может быть меньше 5 символов').isLength({ min: 5 })
] ,controller.registration);
router.post('/login', controller.login);
router.post('/logout', controller.login);
router.post('/activate/:link', controller.login);
router.get('/user', roleMiddleware(['ADMIN']) ,controller.getUser);
