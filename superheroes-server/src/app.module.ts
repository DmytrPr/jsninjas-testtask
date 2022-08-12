import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { SuperheroModule } from './modules/superhero/superhero.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: resolve(
        __dirname,
        '../config',
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
      ),
    }),
    SuperheroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
