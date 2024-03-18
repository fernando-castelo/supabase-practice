import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Supabase } from '../supabase';
import { LoginDto } from './dto/LoginDto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly supabase: Supabase) {}

  async signUpNewUser(login: LoginDto) {
    const { data, error } = await this.supabase.getClient().auth.signUp({
      email: login.email,
      password: login.password,
    });
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }
}
