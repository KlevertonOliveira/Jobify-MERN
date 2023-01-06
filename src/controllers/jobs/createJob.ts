import Job from '@models/Job';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../errors';

export async function createJob(req: Request, res: Response) {
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError('Please, provide all values');
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  return res.status(StatusCodes.CREATED).json({ job });
}
