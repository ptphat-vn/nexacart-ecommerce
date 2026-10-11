import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerModule } from './logger/logger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerModule.createLogger(),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
