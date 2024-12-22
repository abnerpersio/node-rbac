import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../../application/interfaces/http';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      headers: request.headers as Record<string, string>,
      metadata: request.metadata,
      body: request.body,
      params: request.params,
    });

    if (result === true) {
      next();
      return;
    }

    if ('statusCode' in result) {
      return response.status(result.statusCode).json(result.body);
    }

    if (result.metadata) {
      request.metadata = {
        ...request.metadata,
        ...result.metadata,
      };
    }

    next();
  };
}
