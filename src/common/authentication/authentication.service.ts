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
    const accessToken = this.getAccessToken(request);

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

  getUser(@Req() request: Request) {
    const cookie = request.cookies['user'];

    return cookie;
  }

  getSession(@Req() request: Request) {
    const cookie = request.cookies['session'];

    return cookie;
  }

  async getAccessToken(@Req() request: Request) {
    try {
      const storedUserData = await JSON.parse(this.getSession(request));

      if (!storedUserData) {
        console.log('Session data is undefined');
        return undefined;
      }

      const accessToken = storedUserData.access_token;

      if (!accessToken) {
        console.log('Access token is not found in session data');
        return undefined;
      }

      return accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      return undefined;
    }
  }

  async signOut(request: Request, response: Response) {
    console.log('signOut');
    const accessToken = await this.getAccessToken(request);

    const { error } = await this.supabase.getClient(accessToken).auth.signOut();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    response.clearCookie('session');
    response.clearCookie('user');

    return response.json({ message: 'success' });
  }
}
