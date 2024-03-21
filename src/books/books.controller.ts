import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './interface/CreateBookDto';
import { Request } from 'express';
import { UpdateBookDto } from './interface/UpdateBookDto';

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

  @Put(':id')
  async updateBookById(
    @Param('id') bookId: number,
    @Req() request: Request,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    try {
      return await this.bookService.updateBookById(
        request,
        bookId,
        updateBookDto,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async deleteBookById(@Req() request: Request, @Param('id') bookId: number) {
    try {
      return await this.bookService.deleteBookById(request, bookId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
