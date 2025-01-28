import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInterface } from '../users/interfaces/user.interface';
import { ResponseService } from '../shared/responses.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private responseService: ResponseService
  ) {}

  @Post("signup")
  @ApiOperation({ summary: "Sign up a new user" })
  @ApiBody({
    required: true,
    description: "user data",
    schema: {
      example: {
        name: "Gonzalo",
        lastName: "Casanova",
        email: "gcasanova@mail.com",
        password: "Password123!",
        role: new Types.ObjectId()
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Generic response for post requests" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Generic response for requests that raise exceptions" })
  async signUp(@Body() user: UserInterface) {
    try {
      await this.authService.signUp(user)
      return this.responseService.create()

    } catch(error: any) {
      if(error.code === 11000) {
        return this.responseService.error("Mail already in use", 400)
      }
      return this.responseService.error(error.message, error.code)
    }
  }

  @Post("login")
  @ApiOperation({ summary: "Login users" })
  @ApiBody({
    required: true,
    description: "user email and password",
    schema: {
      example: {
        email: "gcasanova@mail.com",
        password: "Password123!",
      }
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: "Generic response for get requests" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Generic response for requests that raise exceptions" })
  async login(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    try {
      const token = await this.authService.login(email, password)
      return this.responseService.success(token)
    } catch(error) {
      return this.responseService.error(error.message, error.code)
    }
  }
}
