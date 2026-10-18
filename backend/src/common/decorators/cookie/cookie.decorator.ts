import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenKeys } from '../../../app/auth/consts/jwt.const';

export interface CookieInfo {
  [TokenKeys.ACCESS_TOKEN_KEY]: string;
  [TokenKeys.REFRESH_TOKEN_KEY]: string;
}

export const Cookies = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const cookies = req.cookie;
    return key ? cookies[key] : cookies;
  },
);
