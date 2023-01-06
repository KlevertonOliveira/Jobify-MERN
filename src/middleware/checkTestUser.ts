import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors';

export function checkTestUser(req: Request, res: Response, next: NextFunction) {
  if (req.user.userId === '63b43ac6ffc466d32b09e553') {
    throw new BadRequestError(
      'Test User is not authorized to perform this action!'
    );
  }
  next();
}
