import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from 'src/common/authentication';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { SupabaseModule } from 'src/common/supabase';

@Module({
  imports: [AuthenticationModule, ConfigModule.forRoot(), SupabaseModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
