import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

import { AuthGuard } from './auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { ZodExceptionFilter } from '../catching-everything/zod-exception/zod-exception.filter';
import { LoggingInterceptor } from '../logger/logging.interceptor';
import { CatchEverythingFilter } from '../catching-everything/catching-everything.filter';
import { FormatResponseInterceptor } from '../common/interceptors/format-response/format-response.interceptor';
import { LoggerModule } from '../logger/logger.module';
import { ApiUtilModule } from '../common/utils/api-util/api-util.module';
import { PrismaModule } from '../common/prisma/prisma.module';
import { QueryUtilModule } from '../common/utils/query-util/query-util.module';
import { CacheUtilModule } from '../common/utils/cache-util/cache-util.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { VendorsModule } from './vendors/vendors.module';
import { AccessControlGuard } from '../common/guards/access-control/access-control.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // validate: validate,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    LoggerModule,
    ApiUtilModule,
    QueryUtilModule,
    // FileUtilModule,
    CacheUtilModule,
    // RateLimitModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    VendorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ZodExceptionFilter,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: APP_FILTER, useClass: CatchEverythingFilter },
    { provide: APP_INTERCEPTOR, useClass: FormatResponseInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: AccessControlGuard },
  ],
})
export class AppModule {}
