import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './common/supabase';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './common/authentication';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthenticationModule,
    SupabaseModule,
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
