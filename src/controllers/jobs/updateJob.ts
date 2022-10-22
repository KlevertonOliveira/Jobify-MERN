import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function updateJob(req: Request, res: Response) {
  return res.status(StatusCodes.CREATED).json({
    message: 'update job route'
  })
}