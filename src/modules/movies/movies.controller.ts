import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from '../roles/decorators/roles.decorator';
import { ROLES } from '../roles/constants/roles.constants';
import { RolesGuard } from '../roles/guards/roles.guards';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseService } from '../shared/responses.service';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly responseService: ResponseService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMovies() {
    const movies = await this.moviesService.getMovies()
    return this.responseService.success(movies)
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.REGULAR_USER)
  async getMovieById(@Param("id") id: string) {
    const movie = await this.moviesService.getMovieById(id)
    return this.responseService.success(movie)
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.REGULAR_USER)
  async createMovie(@Body() movie: object) {
    const result = await this.moviesService.createMovie(movie)
    return this.responseService.create(result)
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async updateMovie(
    @Param("id") id: string,
    @Body() updates: object
  ) {
    const result = await this.moviesService.updateMovie(id, updates)
    return this.responseService.update(result)
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async removeMovie(@Param("id") id: string) {
    const result = await this.moviesService.removeMovie(id)
    return this.responseService.delete(result)
  }
}
