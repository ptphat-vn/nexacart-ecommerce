import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from '../../common/utils/query-util/query-util.service';
import { ExcelUtilModule } from '../../common/utils/excel-util/excel-util.module';
import { PermissionsController } from './permissions.controller';
import { PaginationUtilModule } from '../../common/utils/pagination-util/pagination-util.module';
import { QueryUtilModule } from '../../common/utils/query-util/query-util.module';

@Module({
  imports: [ExcelUtilModule, PaginationUtilModule, QueryUtilModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, PaginationUtilService, QueryUtilService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
