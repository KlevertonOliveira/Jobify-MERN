import { User } from '@models/User';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from 'src/errors';

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Please, provide all values')
  }

  const emailAlreadyRegistered = await User.findOne({ email });

  if (emailAlreadyRegistered) {
    throw new BadRequestError('Email already in use');
  }

  const user = await User.create({ name, email, password });
  const token = user.createToken();

  return res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      lastName: user.lastName
    },
    token,
    location: user.location
  })
}