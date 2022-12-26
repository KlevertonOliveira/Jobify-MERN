import Job from '@models/Job';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function getAllJobs(req: Request, res: Response) {
  const jobs = await Job.find({ createdBy: req.user.userId });  
  
  return res.status(StatusCodes.OK).json({ 
    totalJobs: jobs.length,
    jobs,
    numberOfPages: 1,
  })
}