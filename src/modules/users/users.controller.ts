import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guards';
import { Roles } from '../roles/decorators/roles.decorator';
import { ROLES } from '../roles/constants/roles.constants';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Get()
  async getUserById(@Query("id") id: string) {
    return await this.userService.getUserById(id)
  }
}
