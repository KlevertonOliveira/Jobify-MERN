import { login, register, updateUser } from '@controllers/auth';
import express from 'express';
import { authenticateUser } from 'src/middleware/authenticateUser';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message:
    'Too many requests from this IP address. Please, try again after 15 minutes.',
});

export const authRouter = express.Router();

authRouter.route('/register').post(apiLimiter, register);
authRouter.route('/login').post(apiLimiter, login);
authRouter.route('/updateUser').patch(authenticateUser, updateUser);
