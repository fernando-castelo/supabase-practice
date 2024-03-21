import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthenticationService } from 'src/common/authentication';
import { Supabase } from 'src/common/supabase';
import { Request } from 'express';
import { CreateBookDto } from './interface/CreateBookDto';

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
}
