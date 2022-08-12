import { Module } from '@nestjs/common';
import { PrismaService } from './schema/services/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
