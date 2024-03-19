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
    const { data, error } = await this.supabase.getClient(false).auth.signUp({
      email: login.email,
      password: login.password,
    });
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const jwt = await this.jwtService.signAsync({ id: data.user?.id });
    return jwt;
  }

  async signInWithEmail(request: Request, response: Response, login: LoginDto) {
    const accessToken = this.getAcessToken(request);

    const { data, error } = await this.supabase
      .getClient(accessToken)
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
    console.log('getUser');
    const cookie = request.cookies['user'];

    return cookie;
  }

  async getSession(@Req() request: Request) {
    console.log('getSession');
    const cookie = request.cookies['session'];

    return cookie;
  }

  async getAcessToken(@Req() request: Request) {
    const storedUserData = await this.getSession(request);

    const accessToken = storedUserData?.access_token;

    return accessToken;
  }

  async signOut(request: Request, response: Response) {
    console.log('signOut');
    const accessToken = this.getAcessToken(request);

    const { error } = await this.supabase.getClient(accessToken).auth.signOut();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    response.clearCookie('session');
    response.clearCookie('user');

    return response.json({ message: 'success' });
  }
}
