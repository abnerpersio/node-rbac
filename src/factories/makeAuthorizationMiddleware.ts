import { PermissionCode } from '../application/config/constants/permission';
import { AuthorizationMiddleware } from '../application/middlewares/AuthorizationMiddleware';
import { makeGetRolePermissionsUseCase } from './makeGetRolePermissionsUseCase';

export function makeAuthorizationMiddleware(requiredCodes: PermissionCode[]) {
  return new AuthorizationMiddleware(
    requiredCodes,
    makeGetRolePermissionsUseCase()
  );
}
