import { IsNumber } from 'class-validator';
import { CreateBookDto } from './CreateBookDto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNumber()
  id: number;
}
