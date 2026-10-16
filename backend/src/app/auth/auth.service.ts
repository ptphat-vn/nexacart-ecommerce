import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { StringUtilService } from '../../common/utils/string-util/string-util.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { JWTToken, TokenKeys } from './consts/jwt.const';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private stringUtilService: StringUtilService,
    private jwtService: JwtService,
  ) {}
  async createToken<T extends Record<string, any>>(payload: T) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: JWTToken.ACCESS_TOKEN_EXPIRE_IN,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: JWTToken.REFRESH_TOKEN_EXPIRE_IN,
    });
    return {
      [TokenKeys.ACCESS_TOKEN_KEY]: accessToken,
      [TokenKeys.REFRESH_TOKEN_KEY]: refreshToken,
    };
  }
  async verifyToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException(error);
    }
  }
  async signUp();
}
