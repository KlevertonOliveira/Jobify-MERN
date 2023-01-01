import Job from '@models/Job';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface QueryObject {
  createdBy: string;
  status?: string;
  type?: string;
  position?: Object;
}

export async function getAllJobs(req: Request, res: Response) {
  const { search, status, type, sort } = req.query;

  const queryObject: QueryObject = {
    createdBy: req.user.userId.valueOf(),
  };

  if (status && status !== 'all') {
    queryObject.status = status as string;
  }

  if (type && type !== 'all') {
    queryObject.type = type as string;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let sortOption: string;

  switch (sort) {
    case 'oldest':
      sortOption = 'createdAt';
      break;
    case 'a-z':
      sortOption = 'position';
      break;
    case 'z-a':
      sortOption = '-position';
      break;
    default:
      sortOption = '-createdAt';
      break;
  }

  const jobs = await Job.find(queryObject).sort(sortOption);

  return res.status(StatusCodes.OK).json({
    totalJobs: jobs.length,
    jobs,
    numberOfPages: 1,
  });
}
