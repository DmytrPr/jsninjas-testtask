import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment } from './interfaces/environment.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService<Environment>>(ConfigService);
  const port = config.get('port');

  app.enableCors({ origin: ['http://localhost:8080'], credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  Logger.log(`Application successfully started on ${port} port`, 'Bootstrap');

  await app.listen(port || 3000);
}
bootstrap();
