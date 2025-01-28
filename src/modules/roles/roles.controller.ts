import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleInterface } from './interfaces/roles.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guards';
import { ROLES } from './enums/roles.enum';
import { Roles } from './decorators/roles.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {

  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: "Creates a new role", security: [{ jwt: [] }] })
  @ApiBody({
    description: "data of the role to create",
    schema: {
      example: {
        name: "REGULAR_USER"
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Generic response for post requests" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async createRole(@Body() role: RoleInterface) {
    return await this.rolesService.createRole(role)
  }

  @Get()
  @ApiOperation({ summary: "Get a role based on id or get all roles", security: [{ jwt: [] }] })
  @ApiResponse({ status: HttpStatus.OK, description: "Generic response for get requests" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async getRoles(@Query("id") id: string) {
    return await this.rolesService.getRoles(id)
  }
}
