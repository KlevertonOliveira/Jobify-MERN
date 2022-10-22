import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function login(req: Request, res: Response) {
  return res.status(StatusCodes.OK).json({
    message: 'Login route'
  })
}