import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { SuperheroCreateDTO } from './superhero.create.dto';

export class SuperheroEditDTO extends PartialType(SuperheroCreateDTO) {
  @IsUUID()
  id: string;
}
