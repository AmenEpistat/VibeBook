import { Router } from 'express';
import { authController } from './authController.js';
import { check } from 'express-validator';

export const router = new Router();
const controller = new authController();

router.post('/registration',[
  check('email', 'Имя не может быть пустым').notEmpty(),
  check('password', 'Пароль не может быть меньше 5 символов').isLength({ min: 5 })
] ,controller.registration);
router.post('/login', controller.login);
router.get('/user', controller.getUser);
