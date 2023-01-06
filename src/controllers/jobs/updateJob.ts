import Job from '@models/Job';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../../errors';
import { checkPermissions } from '../../utils/checkPermissions';

export async function updateJob(req: Request, res: Response) {
  const {
    params: { id: jobId },
    body: { company, position },
  } = req;

  if (!company || !position) {
    throw new BadRequestError('Please, provide all values');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No jobs found with id ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(StatusCodes.OK).json({ updatedJob });
}
