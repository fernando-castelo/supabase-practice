import { IsString, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  author_name: string;
}
