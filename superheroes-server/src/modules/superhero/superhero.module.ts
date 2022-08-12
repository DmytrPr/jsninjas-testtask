import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DatabaseModule } from '../database/database.module';
import { SuperheroService } from './services/superhero.service';
import { SuperheroController } from './superhero.controller';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
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
          cb(null, 'images');
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  ],
  providers: [SuperheroService],
  controllers: [SuperheroController],
})
export class SuperheroModule {}
