import { PermissionCode } from '../config/constants/permission';
import { IMiddleware, IMiddlewareResult, IRequest } from '../interfaces/http';
import { GetRolePermissionsUseCase } from '../useCases/GetRolePermissionsUseCase';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredCodes: PermissionCode[],
    private readonly getRolePermissionsUseCase: GetRolePermissionsUseCase
  ) {}

  async handle({ metadata }: IRequest): Promise<IMiddlewareResult> {
    const roleId = metadata?.account?.roleId;

    if (!roleId) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.',
        },
      };
    }

    const { permissionsCodes } = await this.getRolePermissionsUseCase.execute({
      roleId,
    });

    const isAllowed = this.requiredCodes.some((code) =>
      permissionsCodes.includes(code)
    );

    if (!isAllowed) {
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
