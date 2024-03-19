import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './interface/CreateUserDto';
import { Request } from 'express';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(
    @Req() request: Request,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      return await this.appService.createUser(request, createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async getUsers(@Req() request: Request) {
    try {
      return await this.appService.getUsers(request);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
