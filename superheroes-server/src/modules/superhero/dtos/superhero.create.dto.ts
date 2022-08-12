import { IsString, MaxLength, MinLength } from 'class-validator';

export class SuperheroCreateDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  nickname: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  real_name: string;

  @IsString()
  @MinLength(16)
  @MaxLength(256)
  origin_description: string;

  @IsString()
  @MinLength(16)
  @MaxLength(256)
  superpowers: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  catch_phrase: string;
}
