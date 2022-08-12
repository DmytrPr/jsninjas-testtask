import { IsNumber } from 'class-validator';

export class PaginationRequest {
  @IsNumber({ allowNaN: false, allowInfinity: false })
  size: number;
  @IsNumber({ allowNaN: false, allowInfinity: false })
  offset: number;
}
