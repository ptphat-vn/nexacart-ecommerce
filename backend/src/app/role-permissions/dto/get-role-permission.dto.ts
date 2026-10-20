import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permissions.entity';

export class ExportRolePermissionsDto extends createZodDto(
  z.object({
    roleIDs: z.array(z.string().uuid()).optional().nullish().default(null),
    permissionIDs: z
      .array(z.string().uuid())
      .optional()
      .nullish()
      .default(null),
  }),
) {}

export type RolesData = Pick<Role, 'id' | 'name'>[];
export type RolesImportCreate = Pick<Role, 'name'>[];

export type PermissionsData = Pick<Permission, 'id' | 'name'>[];
export type PermissionsImportCreate = Pick<Permission, 'name' | 'key'>[];
