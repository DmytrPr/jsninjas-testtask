import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { Environment } from './interfaces/environment.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get<ConfigService<Environment>>(ConfigService);
  const port = config.get('PORT');

  app.enableCors({ origin: ['http://localhost:8080'], credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/',
  });

  Logger.log(`Application successfully started on ${port} port`, 'Bootstrap');

  await app.listen(port || 3000);
}
bootstrap();
