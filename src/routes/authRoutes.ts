import { login, register, updateUser } from '@controllers/auth';
import express from 'express';
import { authenticateUser } from 'src/middleware/authenticateUser';
export const authRouter = express.Router();

authRouter.route('/login').post(login);
authRouter.route('/register').post(register);
authRouter.route('/updateUser').patch(authenticateUser, updateUser);