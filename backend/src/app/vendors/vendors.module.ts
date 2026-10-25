import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { ExcelUtilModule } from '../../common/utils/excel-util/excel-util.module';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { VendorsService } from './vendors.service';
import { QueryUtilService } from '../../common/utils/query-util/query-util.service';

@Module({
  imports: [ExcelUtilModule],
  controllers: [VendorsController],
  providers: [VendorsService, PaginationUtilService, QueryUtilService],
  exports: [VendorsService],
})
export class VendorsModule {}
