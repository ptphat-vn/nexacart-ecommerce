import { ExportExcelDto } from '../../../common/dto/param.dto';
import { Pagination } from '../../../common/utils/pagination-util/interface/pagination-util.interface';

class GetPermissionPaginationDto extends Pagination {}

class ExportPermissionsDto extends ExportExcelDto {}

export { GetPermissionPaginationDto, ExportPermissionsDto };
