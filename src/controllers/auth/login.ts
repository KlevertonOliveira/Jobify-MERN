import { User } from '@models/User';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from 'src/errors';
import { attachCookie } from 'src/utils/attachCookie';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please, provide all values');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = user.createToken();
  user.password = undefined;

  attachCookie(res, token);

  return res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
}
