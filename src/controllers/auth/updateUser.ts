import { User } from '@models/User';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from 'src/errors';
import { attachCookie } from 'src/utils/attachCookie';

export async function updateUser(req: Request, res: Response) {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please, provide all values');
  }

  const { userId } = req.user;
  const user = await User.findById(userId);

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createToken();

  attachCookie(res, token);

  return res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
}
