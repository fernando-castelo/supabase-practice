import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthenticationService } from 'src/common/authentication';
import { Supabase } from 'src/common/supabase';
import { Request } from 'express';
import { CreateBookDto } from './interface/CreateBookDto';
import { UpdateBookDto } from './interface/UpdateBookDto';

@Injectable()
export class BooksService {
  constructor(
    private readonly supabase: Supabase,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async createBook(request: Request, book: CreateBookDto) {
    const access_token =
      await this.authenticationService.getAccessToken(request);

    const { data, error } = await this.supabase
      .getClient(access_token)
      .from('books')
      .insert(book);
    if (error) {
      console.log('ERROR: ' + error.message);
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async getBooksByUser(request: Request) {
    const access_token =
      await this.authenticationService.getAccessToken(request);

    const { data, error } = await this.supabase
      .getClient(access_token)
      .from('books')
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async updateBookById(
    request: Request,
    bookId: number,
    updateBookDto: UpdateBookDto,
  ) {
    const access_token =
      await this.authenticationService.getAccessToken(request);

    const { error } = await this.supabase
      .getClient(access_token)
      .from('books')
      .update(updateBookDto)
      .eq('id', updateBookDto.id);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
