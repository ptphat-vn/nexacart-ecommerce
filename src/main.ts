import { NestFactory } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { initApp } from './init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerModule.createLogger(),
  });

  const {
    PORT = 3000,
    HOST = 'localhost',
    APP_PREFIX = '/api',
    APP_NAME = 'nexacart_ecommerce',
    NODE_ENV = 'development',
  } = process.env;
  initApp(app);
  await app.listen(PORT, HOST);
  const protocol = NODE_ENV === 'production' ? 'https' : 'http';
  Logger.log(
    `Server is running at ${protocol}://${HOST}:${PORT}${APP_PREFIX}`,
    APP_NAME,
  );
}
bootstrap();
