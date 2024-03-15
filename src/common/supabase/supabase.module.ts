import { Module } from '@nestjs/common';
import { Supabase } from './supabase';

@Module({
  imports: [],
  providers: [Supabase],
  exports: [Supabase],
})
export class SupabaseModule {}
