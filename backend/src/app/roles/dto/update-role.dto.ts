import { createZodDto } from 'nestjs-zod';
import { RoleUpdateInputSchema } from '../../../generated/zod';

class UpdateRoleDto extends createZodDto(RoleUpdateInputSchema) {}
export { UpdateRoleDto };
