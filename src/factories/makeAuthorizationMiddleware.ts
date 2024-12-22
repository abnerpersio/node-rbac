import { Role } from '@prisma/client';
import { AuthorizationMiddleware } from '../application/middlewares/AuthorizationMiddleware';

export function makeAuthorizationMiddleware(roles: Role[]) {
  return new AuthorizationMiddleware(roles);
}
