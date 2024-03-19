import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/LoginDto';
import { Response, Request } from 'express';

@Controller('/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post()
  async createUser(@Body() login: LoginDto) {
    try {
      return await this.authenticationService.signUpNewUser(login);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/login')
  async signInUser(
    @Res({ passthrough: true }) response: Response,
    @Body() login: LoginDto,
  ) {
    try {
      return await this.authenticationService.signInWithEmail(response, login);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async signOut() {
    try {
      return await this.authenticationService.signOut();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/user')
  async getUser(@Req() request: Request) {
    try {
      return await this.authenticationService.getUser(request);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('/session')
  async getSession(@Req() request: Request) {
    try {
      return await this.authenticationService.getSession(request);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
