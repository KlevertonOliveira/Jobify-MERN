import Job from '@models/Job';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface QueryObject {
  createdBy: string;
  status?: string;
  type?: string;
  position?: Object;
  location?: Object;
}

export async function getAllJobs(req: Request, res: Response) {
  const { position, location, status, type, sort } = req.query;

  const queryObject: QueryObject = {
    createdBy: req.user.userId.valueOf(),
  };

  /* Status */
  if (status && status !== 'all') {
    queryObject.status = status as string;
  }

  /* Type */
  if (type && type !== 'all') {
    queryObject.type = type as string;
  }

  /* Position */
  if (position) {
    queryObject.position = { $regex: position, $options: 'i' };
  }

  /* Location */
  if (location) {
    queryObject.location = { $regex: location, $options: 'i' };
  }

  /* Sort */
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

  /* Pagination */
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalJobs / limit);

  return res.status(StatusCodes.OK).json({
    totalJobs,
    jobs,
    numberOfPages,
  });
}
