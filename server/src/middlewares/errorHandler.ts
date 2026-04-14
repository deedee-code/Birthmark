import { NextFunction, Request, Response } from 'express';
import ApiResponse from '../utils/apiResponse';
import env from '../configs/env';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
  let statusCode = 500;
  let message = 'Internal server error';
  let errors: Array<{ path: string; message: string }> | null = null;

  if (err.name === 'ZodError' || err.statusCode === 400) {
    statusCode = 400;
    message = 'Validation error';
    errors = err.errors?.map((e: any) => ({
      path: e.path?.join('.') || 'unknown',
      message: e.message,
    })) || [];
  } else if (err.statusCode === 401 || err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = err.message || 'Unauthorized';
  } else if (err.statusCode === 404 || err.name === 'NotFoundError') {
    statusCode = 404;
    message = err.message || 'Resource not found';
  } else if (err.statusCode === 403) {
    statusCode = 403;
    message = err.message || 'Forbidden';
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message || 'An error occurred';
  }

  console.error(`[${new Date().toISOString()}] Error:`, {
    statusCode,
    message,
    path: req.path,
    method: req.method,
    ...(env.NODE_ENV !== 'production' && { stack: err.stack }),
  });

  return res.status(statusCode).json(new ApiResponse(false, message, null, errors));
};

export default errorHandler;
