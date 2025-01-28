import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../users/interfaces/user.interface';
import { compare } from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(user: UserInterface) {
    return await this.usersService.createUser(user)
  }

  async login(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email)

    if(!await this.validatePassword(password, user.password)) {
      throw new UnauthorizedException("Invalid password")
    }

    return {
      accessToken: this.jwtService.sign({ sub: user._id, role: user.role })
    }

  }

  private async validatePassword(decryptedPass: string, encryptedPass: string) {
    return await compare(decryptedPass, encryptedPass)
  }
}
