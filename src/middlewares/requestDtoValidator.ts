import { Request, Response, NextFunction, Handler } from 'express';
import { ClassType } from 'class-transformer/ClassTransformer';
import Validator from '../utils/classes/validator';
import { plainToClass } from 'class-transformer';
import { BadRequestError } from '../common/api-error';

export default function RequestDtoValidator<T>(dtoClass: ClassType<T>): Handler {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const converted: T | Array<T> = plainToClass(dtoClass, req.body);

      if (converted instanceof Array) {
        const promises: Array<Promise<any>> = [];
        for (let i = 0; i < converted.length; i++) {
          promises.push(Validator.validateReqObject(converted[i]));
        }
        await Promise.all(promises);
      } else {
        await Validator.validateReqObject(converted);
      }

      next();
    } catch (e) {
      // validate failed, return error
      next(new BadRequestError(e.message));
    }
  };
}
