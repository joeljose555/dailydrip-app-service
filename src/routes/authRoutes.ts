import express from 'express';
import { signup, login, socialLogin } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/social', socialLogin);

export default router; 