import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('validate.user')
  validateUser(@Body() payload: any) {
    return this.authService.validateUser(payload);
  }

  @MessagePattern('register')
  register(@Body() payload: any) {
    return this.authService.createUser(payload);
  }
}
