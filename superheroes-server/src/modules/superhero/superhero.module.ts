import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Environment } from 'src/interfaces/environment.interface';
import { DatabaseModule } from '../database/database.module';
import { SuperheroService } from './services/superhero.service';
import { SuperheroController } from './superhero.controller';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Environment>) => {
        return {
          fileFilter: (req, file, cb) => {
            if (!/image\/\w+/.test(file.mimetype)) {
              cb(new Error("Uploaded file isn't an image"), false);
            }
            if (file.size > 1024 * 1024) {
              cb(new Error('Uploaded file is bigger than 1 Mb.'), false);
            }
            cb(null, true);
          },
          storage: diskStorage({
            destination: (req, file, cb) => {
              cb(null, configService.get('FILE_UPLOAD_PATH'));
            },
            filename: (req, file, cb) => {
              cb(null, Date.now() + '-' + file.originalname);
            },
          }),
        };
      },
    }),
  ],
  providers: [SuperheroService],
  controllers: [SuperheroController],
})
export class SuperheroModule {}
