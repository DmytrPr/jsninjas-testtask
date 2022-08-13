import { IsNumberString } from 'class-validator';

export class PaginationRequest {
  @IsNumberString()
  size: string;
  @IsNumberString()
  offset: string;
}
