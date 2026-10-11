import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

export const applyMiddleware = (app: INestApplication) => {
  app.use(helmet(), cookieParser());
};
