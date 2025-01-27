import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleInterface } from './interfaces/roles.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guards';
import { ROLES } from './constants/roles.constants';
import { Roles } from './decorators/roles.decorator';

@Controller('roles')
export class RolesController {

  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Post()
  async createRole(@Body() role: RoleInterface) {
    return await this.rolesService.createRole(role)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  @Get()
  async getRoles(@Query("id") id: string) {
    return await this.rolesService.getRoles(id)
  }
}
