import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInterface } from '../users/interfaces/user.interface';
import { ResponseService } from '../shared/responses.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private responseService: ResponseService
  ) {}

  @Post("signup")
  async signUp(@Body() user: UserInterface) {
    try {
      await this.authService.signUp(user)
      return this.responseService.success("Usuario registrado exitosamente")

    } catch(error: any) {
      if(error.code === 11000) {
        return this.responseService.error("Mail already in use", 400)
      }
      return this.responseService.error(error.message, error.code)
    }
  }

  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    await this.authService.login(email, password)
  }
}
