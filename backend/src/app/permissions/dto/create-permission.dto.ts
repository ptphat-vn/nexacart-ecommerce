import { createZodDto } from 'nestjs-zod';
import { PermissionCreateInputSchema } from '../../../generated/zod';
import { ImportExcel } from '../../../common/utils/excel-util/excel-util.const';

class CreatePermissionDto extends createZodDto(PermissionCreateInputSchema) {}
class ImportPermissionsDto extends ImportExcel {}

export { CreatePermissionDto, ImportPermissionsDto };
