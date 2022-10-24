import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';
import { MongoServerError } from 'mongoose/node_modules/mongodb';

export function errorHandler(error, req: Request, res: Response, next: NextFunction) {
  console.log(error);

  const customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
  }

  if (error instanceof Error.ValidationError) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = (
      `Please, provide: ${Object.values(error.errors).map(field => field.message).join(', ')}`
    )
  }

  if (error instanceof MongoServerError) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `${Object.keys(error.keyValue).join(', ')} already in use`
  }

  res.status(customError.statusCode).json({
    message: customError.message
  })
}