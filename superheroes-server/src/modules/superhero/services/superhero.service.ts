import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/schema/services/prisma.service';

@Injectable()
export class SuperheroService {
  constructor(private readonly prismaService: PrismaService) {}
}
