import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './interface/CreateBookDto';
import { Request } from 'express';

@Controller('/books')
export class BooksController {
  private readonly logger = new Logger(BooksController.name);
  constructor(private readonly bookService: BooksService) {}

  @Post()
  async createBook(
    @Req() request: Request,
    @Body() createBookDto: CreateBookDto,
  ) {
    try {
      return await this.bookService.createBook(request, createBookDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async getBooksByUser(@Req() request: Request) {
    try {
      return await this.bookService.getBooksByUser(request);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
