import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [SupabaseModule, ConfigModule.forRoot()],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
