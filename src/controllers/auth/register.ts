import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function register(req: Request, res: Response) {
  return res.status(StatusCodes.OK).json({
    message: 'Register route'
  })
}