import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Supabase } from './common/supabase';
import { CreateUserDto } from './interface/CreateUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(private readonly supabase: Supabase) {}

  async createUser(user: CreateUserDto) {
    const hash = await bcrypt.hash(user.password, 10);
    user['password'] = hash;

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
