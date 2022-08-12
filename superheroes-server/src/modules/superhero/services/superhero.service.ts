import { Injectable, NotFoundException } from '@nestjs/common';
import { Hero } from '@prisma/client';
import { PaginationRequest } from 'src/dtos/pagination-request.dto';
import { Paginated } from 'src/interfaces/paginated-response.interface';
import { PrismaService } from 'src/modules/database/schema/services/prisma.service';
import { SuperheroCreateDTO } from '../dtos/superhero.create.dto';
import { SuperheroEditDTO } from '../dtos/superhero.edit.dto';

@Injectable()
export class SuperheroService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getHeroes({
    size: take,
    offset: skip,
  }: PaginationRequest): Promise<Paginated<Hero>> {
    const [data, total] = await Promise.all([
      this.prismaService.hero.findMany({ take, skip }),
      this.prismaService.hero.count(),
    ]);
    return {
      data,
      total,
    };
  }

  public async getHeroById(id: Hero['id']): Promise<Hero> {
    return this.prismaService.hero.findUnique({ where: { id } });
  }

  public async createHero(data: SuperheroCreateDTO): Promise<Hero> {
    return this.prismaService.hero.create({ data });
  }

  public async removeHeroById(id: Hero['id']): Promise<Hero> {
    return this.prismaService.hero.delete({ where: { id } });
  }

  public async updateHeroById(
    { id, ...newHero }: SuperheroEditDTO,
    files: Array<Express.Multer.File>,
  ): Promise<Hero> {
    const oldHero = await this.prismaService.hero.findUnique({ where: { id } });
    if (!oldHero) {
      throw new NotFoundException("Hero with that id doesn't esxist");
    }
    console.log(files);
    const data: Hero = {
      ...oldHero,
      ...newHero,
      image_paths: [
        ...oldHero.image_paths,
        ...files.map((file) => file.filename),
      ],
    };

    return this.prismaService.hero.update({ where: { id }, data });
  }
}
