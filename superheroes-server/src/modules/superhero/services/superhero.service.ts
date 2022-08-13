import { Injectable, NotFoundException } from '@nestjs/common';
import { Hero } from '@prisma/client';
import { PaginationRequest } from 'src/dtos/pagination-request.dto';
import { Paginated } from 'src/interfaces/paginated-response.interface';
import { PrismaService } from 'src/modules/database/schema/services/prisma.service';
import { SuperheroCreateDTO } from '../dtos/superhero.create.dto';
import { SuperheroEditDTO } from '../dtos/superhero.edit.dto';
import { promises as fs } from 'fs';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Environment } from 'src/interfaces/environment.interface';

@Injectable()
export class SuperheroService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<Environment>,
  ) {}

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

  public async createHero(
    data: SuperheroCreateDTO,
    files: Array<Express.Multer.File>,
  ): Promise<Hero> {
    return this.prismaService.hero.create({
      data: { ...data, image_paths: files.map((file) => file.filename) },
    });
  }

  public async removeHeroById(id: Hero['id']): Promise<Hero> {
    if (!(await this.getHeroById(id))) {
      throw new NotFoundException("Hero with that id doesn't exist");
    }
    return this.prismaService.hero.delete({ where: { id } });
  }

  public async updateHeroById(
    { id, ...newHero }: SuperheroEditDTO,
    files: Array<Express.Multer.File>,
  ): Promise<Hero> {
    const oldHero = await this.prismaService.hero.findUnique({ where: { id } });
    if (!oldHero) {
      throw new NotFoundException("Hero with that id doesn't exist");
    }

    const newImagePaths = [
      ...newHero.image_paths?.split(','),
      ...files.map((file) => file.filename),
    ];

    const toDelete = oldHero.image_paths.filter(
      (img) => !newImagePaths.includes(img),
    );

    await Promise.all(
      toDelete.map(async (img) => {
        fs.unlink(join(this.configService.get('FILE_UPLOAD_PATH'), img));
      }),
    );

    const data: Hero = {
      ...oldHero,
      ...newHero,
      image_paths: newImagePaths,
    };

    return this.prismaService.hero.update({ where: { id }, data });
  }

  //   public async addImagesToHero(
  //     id: Hero['id'],
  //     files: Array<Express.Multer.File>,
  //   ): Promise<Hero> {
  //     const hero = await this.prismaService.hero.findUnique({
  //       where: { id },
  //       select: { image_paths: true },
  //     });

  //     if (!hero) {
  //       throw new NotFoundException("Hero with that id doesn't exist");
  //     }

  //     hero.image_paths = [
  //       ...hero.image_paths,
  //       ...files.map((file) => file.filename),
  //     ];

  //     return this.prismaService.hero.update({
  //       where: { id },
  //       data: { image_paths: hero.image_paths },
  //     });
  //   }

  //   public async removeImageFromHero(
  //     id: Hero['id'],
  //     imageName: string,
  //   ): Promise<Hero> {
  //     const hero = await this.prismaService.hero.findUnique({
  //       where: { id },
  //       select: { image_paths: true },
  //     });
  //     if (!hero) {
  //       throw new NotFoundException("Hero with that id doesn't exist");
  //     }
  //     const index = hero.image_paths.indexOf(imageName);
  //     if (index > -1) {
  //       hero.image_paths.splice(index, 1);
  //     }
  //     await this.prismaService.hero.update({
  //       where: { id },
  //       data: { image_paths: hero.image_paths },
  //     });
  //     return hero;
  //   }
}
