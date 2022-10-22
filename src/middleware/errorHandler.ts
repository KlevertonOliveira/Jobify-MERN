import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function errorHandler(err, req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'An error has ocurred'
  })
}