import { Request } from 'express';

export interface IResponse {
  statusCode: number;
  body: Record<string, any> | null;
}

export type IMiddlewareResult =
  | IResponse
  | { metadata: Partial<Request['metadata']> }
  | true;

export interface IMiddleware {
  handle(request: IRequest): Promise<IMiddlewareResult> | IMiddlewareResult;
}

export interface IRequest {
  body: Record<string, any>;
  params: Record<string, string>;
  headers: Record<string, string>;
  metadata?: Request['metadata'];
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
