import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../utils/apiResponse';

const validate = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await schema.parseAsync(req.body);
      req.body = result;
      next();
    } catch (error: any) {
      const errors = error.errors?.map((err: any) => ({
        path: err.path?.join('.') || 'unknown',
        message: err.message,
      })) || [];

      res.status(400).json(new ApiResponse(false, 'Validation failed', null, errors));
    }
  };
};

export default validate;
