import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/LoginDto';

@Controller('/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post()
  async signInUser(@Body() login: LoginDto) {
    try {
      return await this.authenticationService.signUpNewUser(login);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
