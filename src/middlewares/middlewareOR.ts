import { Request, Response, NextFunction, Handler } from 'express';

function chainMiddleware(middleware1: Handler, middleware2: Handler): Handler {
  return (req: Request, res: Response, next: NextFunction) => {
    middleware1(req, res, (error?: any) => {
      if (error) {
        // If first middleware failed, try second one
        return middleware2(req, res, next);
      }
      // else, exit chain
      next();
    });
  };
}

export default function MiddlewareOR(...middlewares: Array<Handler>): Handler {
  if (middlewares.length) {
    let chain = middlewares[0];

    for (let i = 1; i < middlewares.length; i++) {
      chain = chainMiddleware(chain, middlewares[i]);
    }

    return chain;
  }

  return null;
}
