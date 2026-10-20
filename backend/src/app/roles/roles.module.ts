import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { QueryUtilModule } from '../../common/utils/query-util/query-util.module';
import { PaginationUtilModule } from '../../common/utils/pagination-util/pagination-util.module';
import { QueryUtilService } from '../../common/utils/query-util/query-util.service';

@Module({
  imports: [QueryUtilModule, PaginationUtilModule],
  controllers: [RolesController],
  providers: [RolesService, PaginationUtilService, QueryUtilService],
  exports: [RolesService],
})
export class RolesModule {}
