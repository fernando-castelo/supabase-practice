import { Injectable, InternalServerErrorException, Req } from '@nestjs/common';
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
    const access_token =
      await this.authenticationService.getAccessToken(request);

    const { data, error } = await this.supabase
      .getClient(access_token)
      .from('user')
      .insert(user);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async getUsers(@Req() request: Request) {
    const storedUserData = JSON.parse(
      await this.authenticationService.getUser(request),
    );

    const accessToken = storedUserData?.access_token;

    const { data, error } = await this.supabase
      .getClient(accessToken)
      .from('user')
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
}
