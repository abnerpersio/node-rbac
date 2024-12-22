import { prismaClient } from '../libs/prismaClient';

interface IInput {
  roleId: string;
}

type IOutput = {
  permissionsCodes: string[];
};

export class GetRolePermissionsUseCase {
  async execute({ roleId }: IInput): Promise<IOutput> {
    const rolePermissions = await prismaClient.rolePermission.findMany({
      where: { roleId },
      select: { permissionCode: true },
    });

    const permissionsCodes = rolePermissions.map(
      ({ permissionCode }) => permissionCode
    );

    return { permissionsCodes };
  }
}
