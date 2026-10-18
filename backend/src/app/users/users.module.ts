import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PaginationUtilService],
  exports: [UsersService],
})
export class UsersModule {}
