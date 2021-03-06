import { Response, NextFunction, Handler } from 'express';
import RequestWithUser from '../interfaces/request.interface';
import { ForbiddenError } from '../common/api-error';
import FirebaseAuthMiddleware from './verifyToken';

export default function CheckRole(roleName: string): Handler {
  return function (req: RequestWithUser, res: Response, next: NextFunction): void {
    FirebaseAuthMiddleware(req, res, (error?: any) => {
      if (error) {
        // If authentication failed, skip the rest procedures
        return next(error);
      }

      const user = req.user;

      const roles: Array<string> = user.tokenClaims.roles || [];

      if (!roles.includes(roleName)) {
        return next(new ForbiddenError());
      }

      next();
    });
  };
}
