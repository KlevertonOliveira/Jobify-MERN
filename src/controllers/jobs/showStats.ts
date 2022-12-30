import Job from '@models/Job';
import { format } from 'date-fns';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

type Stats = {
  pending?: number;
  interview?: number;
  declined?: number;
};

export async function showStats(req: Request, res: Response) {
  const aggStats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId as string),
      },
    },
    { $group: { _id: '$status', total: { $sum: 1 } } },
  ]);

  const refactoredStats: Stats = aggStats.reduce((acc, status) => {
    return { ...acc, [status._id]: status.total };
  }, {});

  const stats = {
    pending: refactoredStats.pending || 0,
    interview: refactoredStats.interview || 0,
    declined: refactoredStats.declined || 0,
  };

  const aggMonthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId as string),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        total: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  const monthlyApplications = aggMonthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        total,
      } = item;

      const date = format(new Date(year, month - 1), 'MMM Y');

      return { date, total };
    })
    .reverse();

  return res.status(StatusCodes.OK).json({ stats, monthlyApplications });
}
