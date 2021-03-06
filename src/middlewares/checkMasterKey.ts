import { Response, NextFunction, Request } from 'express';
import { MASTER_KEY_HEADER, MASTER_KEY } from '../config';
import { ForbiddenError } from '../common/api-error';

export default function CheckMasterKey(req: Request, res: Response, next: NextFunction): void {
  const headerMasterKey = req.header(MASTER_KEY_HEADER);

  if (headerMasterKey !== MASTER_KEY) {
    return next(new ForbiddenError());
  }

  next();
}
