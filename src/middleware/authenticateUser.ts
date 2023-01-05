import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from 'src/errors';

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
}
