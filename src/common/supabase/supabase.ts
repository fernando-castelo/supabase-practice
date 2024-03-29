import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { getEnv } from '../configuration';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientInstance: SupabaseClient;

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getClient(token: any) {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');

    let options;
    if (token) {
      options = {
        schema: 'public',
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      };
    } else {
      options = [];
    }

    this.clientInstance = createClient(
      getEnv().supabase.baseUrl,
      getEnv().supabase.token,
      options,
    );

    return this.clientInstance;
  }
}
