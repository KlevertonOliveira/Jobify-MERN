import { StatusCodes } from 'http-status-codes';

export class UnauthenticatedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}