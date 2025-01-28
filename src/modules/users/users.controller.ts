import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../roles/guards/roles.guards';
import { Roles } from '../roles/decorators/roles.decorator';
import { ROLES } from '../roles/enums/roles.enum';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get a user based on given id", security: [{ jwt: [] }] })
  @ApiResponse({ status: HttpStatus.OK, description: "Generic response for get requests" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async getUserById(@Query("id") id: string) {
    return await this.userService.getUserById(id)
  }
}
