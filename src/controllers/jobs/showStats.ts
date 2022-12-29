import Job from '@models/Job';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

type Status = {
  pending?: number;
  interview?: number;
  declined?: number;
};

export async function showStats(req: Request, res: Response) {
  const stats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId as string),
      },
    },
    { $group: { _id: '$status', total: { $sum: 1 } } },
  ]);

  const reducedStats: Status = stats.reduce((acc, status) => {
    return { ...acc, [status._id]: status.total };
  }, {});

  const completeStats = {
    pending: reducedStats.pending || 0,
    interview: reducedStats.interview || 0,
    declined: reducedStats.declined || 0,
  };

  let monthlyApplications = [];

  return res
    .status(StatusCodes.CREATED)
    .json({ completeStats, monthlyApplications });
}
