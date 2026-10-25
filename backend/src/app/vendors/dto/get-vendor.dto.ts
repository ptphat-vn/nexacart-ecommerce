import { ExportExcelDto } from '../../../common/dto/param.dto';
import { Pagination } from '../../../common/utils/pagination-util/interface/pagination-util.interface';

class GetVendorsPaginationDto extends Pagination {}

class ExportVendorsDto extends ExportExcelDto {}

export { GetVendorsPaginationDto, ExportVendorsDto };
