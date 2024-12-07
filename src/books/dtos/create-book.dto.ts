// src/books/dto/create-book.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
