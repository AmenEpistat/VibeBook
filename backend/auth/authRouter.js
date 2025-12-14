import { Router } from 'express';
import { authController } from './controller/authController.js';
import { check } from 'express-validator';
import { roleMiddleware } from './middleware/roleMiddleware.js';
import AdminController from './controller/adminController.js';
import { authMiddleware } from './middleware/authMiddleware.js';

export const router = new Router();
const controller = new authController();

router.post('/registration',[
	check('email', 'Имя не может быть пустым').notEmpty().isEmail(),
	check('password', 'Пароль не может быть меньше 5 символов').isLength({ min: 5 })
], controller.registration);

router.post('/login', controller.login);
router.get('/logout', controller.logout);

router.get('/activate/:link', controller.activate);
router.post('/refresh', controller.refresh);

router.get('/users', authMiddleware, roleMiddleware(['ADMIN']), AdminController.getUsers);
router.post('/makeAdmin/:userId', authMiddleware, roleMiddleware(['ADMIN']), AdminController.makeAdmin);
