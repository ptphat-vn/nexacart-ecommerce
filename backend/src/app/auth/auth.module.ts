import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTEnvs } from './consts/jwt.const';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StringUtilService } from '../../common/utils/string-util/string-util.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>(JWTEnvs.JWT_SECRET),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, StringUtilService],
  exports: [AuthService],
})
export class AuthModule {}
