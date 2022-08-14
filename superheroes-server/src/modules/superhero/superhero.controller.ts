import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Hero } from '@prisma/client';
import { PaginationRequest } from 'src/dtos/pagination-request.dto';
import { Paginated } from 'src/interfaces/paginated-response.interface';
import { SuperheroCreateDTO } from './dtos/superhero.create.dto';
import { SuperheroEditDTO } from './dtos/superhero.edit.dto';
import { uuidDTO } from './dtos/uuid.dto';
import { SuperheroService } from './services/superhero.service';

@Controller('heroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Get()
  public async getHeroes(
    @Query() pag: PaginationRequest,
  ): Promise<Paginated<Hero>> {
    return this.superheroService.getHeroes(pag);
  }

  @Get(':id')
  public async getHero(@Param() { id }: uuidDTO): Promise<Hero> {
    return this.superheroService.getHeroById(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4))
  public async createHero(
    @Body() hero: SuperheroCreateDTO,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ): Promise<Hero> {
    return this.superheroService.createHero(hero, files);
  }

  @Delete(':id')
  public deleteHero(@Param() { id }: uuidDTO): Promise<Hero> {
    return this.superheroService.removeHeroById(id);
  }

  @Patch()
  @UseInterceptors(FilesInterceptor('images', 4))
  public updateHero(
    @Body() hero: SuperheroEditDTO,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ): Promise<Hero> {
    return this.superheroService.updateHeroById(hero, files);
  }
}
