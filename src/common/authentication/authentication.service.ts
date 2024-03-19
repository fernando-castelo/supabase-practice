import { Injectable, InternalServerErrorException, Req } from '@nestjs/common';
import { Supabase } from '../supabase';
import { LoginDto } from './dto/LoginDto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly supabase: Supabase,
    private jwtService: JwtService,
  ) {}

  async signUpNewUser(login: LoginDto) {
    const { data, error } = await this.supabase.getClient().auth.signUp({
      email: login.email,
      password: login.password,
    });
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const jwt = await this.jwtService.signAsync({ id: data.user?.id });
    return jwt;
  }

  async signInWithEmail(response: Response, login: LoginDto) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.signInWithPassword({
        email: login.email,
        password: login.password,
      });
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    try {
      response.cookie('user', JSON.stringify(data?.user), { httpOnly: true });
      response.cookie('session', JSON.stringify(data?.session), {
        httpOnly: true,
      });
    } catch (error) {
      return `Error setting cookies: ${error}`;
    }

    return {
      message: 'sucess',
    };
  }

  async getUser(@Req() request: Request) {
    const cookie = request.cookies['user'];

    return cookie;
  }

  async getSession(@Req() request: Request) {
    const cookie = request.cookies['session'];

    return cookie;
  }

  async signOut() {
    const { error } = await this.supabase.getClient().auth.signOut();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
