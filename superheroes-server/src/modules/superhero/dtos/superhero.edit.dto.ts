import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { SuperheroCreateDTO } from './superhero.create.dto';

export class SuperheroEditDTO extends PartialType(SuperheroCreateDTO) {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  image_paths?: string;
}
