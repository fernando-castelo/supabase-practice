import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Supabase } from './common/supabase';
import { CreateUserDto } from './interface/CreateUserDto';
import { Request } from 'express';
import { AuthenticationService } from './common/authentication';

@Injectable()
export class AppService {
  constructor(
    private readonly supabase: Supabase,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async createUser(request: Request, user: CreateUserDto) {
    const storedUserData = JSON.parse(
      await this.authenticationService.getUser(request),
    );

    console.log(storedUserData);

    const userId = storedUserData?.id;

    user['user_id'] = userId;

    console.log(user);

    const { data, error } = await this.supabase
      .getClient()
      .from('user')
      .insert(user);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async getUsers() {
    const { data, error } = await this.supabase
      .getClient()
      .from('user')
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
}
