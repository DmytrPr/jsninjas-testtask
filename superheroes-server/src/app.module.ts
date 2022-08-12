import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
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
