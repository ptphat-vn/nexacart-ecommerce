import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ImportExcel } from '../../../common/utils/excel-util/excel-util.const';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class ImportUsersDto extends ImportExcel {}
