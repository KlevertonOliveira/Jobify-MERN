import Job from '@models/Job';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from 'src/errors';

export async function getJob(req: Request, res: Response) {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ createdBy: req.user.userId, _id: jobId });

  if (!job) {
    throw new NotFoundError(`No jobs found with id ${jobId}`);
  }

  return res.status(StatusCodes.OK).json({ job });
}
