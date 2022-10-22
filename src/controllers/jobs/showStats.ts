import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function showStats(req: Request, res: Response) {
  return res.status(StatusCodes.CREATED).json({
    message: 'show stats route'
  })
}