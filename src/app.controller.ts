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

  @Get()
  getHello() {
    this.logger.log('GET / called');
    return this.appService.getHello();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.appService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
