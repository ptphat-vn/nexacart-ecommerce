import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { CatchEverythingFilter } from './catching-everything/catching-everything.filter';
import { ZodExceptionFilter } from './catching-everything/zod-exception/zod-exception.filter';
import { ApiUtilModule } from './common/utils/api-utils/api-util.module';
import { FormatResponseInterceptor } from './common/interceptors/format-response/format-response.interceptor';

@Module({
  imports: [UsersModule, LoggerModule, ApiUtilModule],
  controllers: [AppController],
  providers: [
    AppService,
    ZodExceptionFilter,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: APP_FILTER, useClass: CatchEverythingFilter },
    { provide: APP_INTERCEPTOR, useClass: FormatResponseInterceptor },
  ],
})
export class AppModule {}
