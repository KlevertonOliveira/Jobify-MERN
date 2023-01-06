import { Request } from 'express';
import { UnauthorizedError } from '../errors';

export function checkPermissions(
  requestUser: Request['user'],
  resourceUserId: Object
) {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError('Not authorized to access this route');
}
