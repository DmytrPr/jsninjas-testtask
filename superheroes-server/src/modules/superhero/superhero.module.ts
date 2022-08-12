import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SuperheroService } from './services/superhero.service';
import { SuperheroController } from './superhero.controller';

@Module({
  imports: [DatabaseModule],
  providers: [SuperheroService],
  controllers: [SuperheroController],
})
export class SuperheroModule {}
