import { Role } from '@prisma/client';
import { IMiddleware, IMiddlewareResult, IRequest } from '../interfaces/http';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(private readonly allowedRoles: Role[]) {}

  handle({ metadata }: IRequest): IMiddlewareResult {
    const role = metadata?.account?.role;

    if (!role) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.',
        },
      };
    }

    if (!this.allowedRoles.includes(role as Role)) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.',
        },
      };
    }

    return true;
  }
}
