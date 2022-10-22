import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function getAllJobs(req: Request, res: Response) {
  return res.status(StatusCodes.CREATED).json({
    message: 'get all jobs route'
  })
}