import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from 'src/errors';

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Invalid')
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }

}