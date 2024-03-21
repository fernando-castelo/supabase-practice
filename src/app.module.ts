import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './common/supabase';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './common/authentication';
import { JwtModule } from '@nestjs/jwt';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    AuthenticationModule,
    SupabaseModule,
    BooksModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
