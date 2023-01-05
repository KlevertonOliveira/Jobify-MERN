import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function logout(req: Request, res: Response) {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({
    message: 'User logged out!',
  });
}
