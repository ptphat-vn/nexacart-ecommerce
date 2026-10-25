import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from '../../common/utils/query-util/query-util.service';
import { ExcelUtilModule } from '../../common/utils/excel-util/excel-util.module';
import { ExcelUtilService } from '../../common/utils/excel-util/excel-util.service';

@Module({
  imports: [ExcelUtilModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    PaginationUtilService,
    QueryUtilService,
    ExcelUtilService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
