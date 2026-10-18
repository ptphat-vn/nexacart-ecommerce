import { ExportExcelDto } from '../../../common/dto/param.dto';
import { Pagination } from '../../../common/utils/pagination-util/interface/pagination-util.interface';
import { User } from '../entities/user.entity';

class ExportUserDto extends ExportExcelDto {}

class IsExistPermissionKeyDto {
  userID: User['id'];
  permissionKey: string;
}

class GetUsersPaginationDto extends Pagination {}
export { ExportUserDto, IsExistPermissionKeyDto, GetUsersPaginationDto };
