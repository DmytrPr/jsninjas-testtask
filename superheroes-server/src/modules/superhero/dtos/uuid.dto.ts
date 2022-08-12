import { IsUUID } from 'class-validator';

export class uuidDTO {
  @IsUUID()
  id: string;
}
