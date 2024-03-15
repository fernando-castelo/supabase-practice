import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Supabase } from './common/supabase';
import { CreateUserDto } from './interface/CreateUserDto';

type Hello = {
  id: number;
  name: string;
  description;
};

@Injectable()
export class AppService {
  constructor(private readonly supabase: Supabase) {}

  async getHello(): Promise<Hello[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from('user')
      .select();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async createUser(user: CreateUserDto) {
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
