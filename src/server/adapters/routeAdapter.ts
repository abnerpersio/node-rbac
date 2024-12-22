import { Request, Response } from 'express';

import { IController } from '../../application/interfaces/http';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      headers: request.headers as Record<string, string>,
      metadata: request.metadata,
      body: request.body,
      params: request.params,
    });

    response.status(statusCode).json(body);
  };
}
