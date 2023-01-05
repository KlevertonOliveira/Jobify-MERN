import { User } from '@models/User';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function getCurrentUser(req: Request, res: Response) {
  const user = await User.findById(req.user.userId);
  return res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
}
