import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from '../config/env';
import { IMiddleware, IMiddlewareResult, IRequest } from '../interfaces/http';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IMiddlewareResult> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token.',
        },
      };
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        throw new Error();
      }

      const payload = verify(token, env.jwtSecret) as JwtPayload;

      return {
        metadata: {
          account: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token.',
        },
      };
    }
  }
}
