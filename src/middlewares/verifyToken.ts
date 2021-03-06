import { Request, Response, NextFunction } from 'express';
import { BadTokenError, AccessTokenError } from '../common/api-error';
import FirebaseUser from '../providers/firebase/firebaseUser';
import FirebaseAuthService from '../providers/firebase/firebaseAuth.service';
import RequestWithUser from '../interfaces/request.interface';

const BEARER = 'Bearer ';

export const extractBearerToken = (req: Request): string => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.length || !authorization.startsWith(BEARER)) {
    return null;
  }

  const token = authorization.replace(BEARER, '');
  return token;
};

const FirebaseAuthMiddleware = async (
  request: RequestWithUser,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const token = extractBearerToken(request);

  if (!token) {
    // missing token
    return next(new BadTokenError());
  }

  const decoded = await FirebaseAuthService.verifyToken(token);

  if (!decoded) {
    // invalid token
    return next(new AccessTokenError());
  }

  const user: FirebaseUser = {
    firebaseUID: decoded.uid,
    email: decoded.email,
    phoneNumber: decoded.phone_number,
    tokenClaims: decoded
  };

  request.user = user;

  next();
};

export default FirebaseAuthMiddleware;
