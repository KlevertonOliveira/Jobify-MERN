import Job from '@models/Job';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from 'src/errors';
import { checkPermissions } from 'src/utils/checkPermissions';

export async function deleteJob(req: Request, res: Response) {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No jobs found with id ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();

  return res.status(StatusCodes.OK).json({
    message: 'Success! Job removed',
  });
}
