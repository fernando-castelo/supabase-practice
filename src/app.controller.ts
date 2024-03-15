import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './interface/CreateUserDto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.appService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async getUsers() {
    try {
      return await this.appService.getUsers();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
