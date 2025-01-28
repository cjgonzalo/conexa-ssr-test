import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Roles } from '../roles/decorators/roles.decorator';
import { ROLES } from '../roles/enums/roles.enum';
import { RolesGuard } from '../roles/guards/roles.guards';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseService } from '../shared/responses.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Movies")
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly responseService: ResponseService
  ) {}

  @Get()
  @ApiOperation({ summary: "Returns all movies" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Generic response for post requests" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMovies() {
    const movies = await this.moviesService.getMovies()
    return this.responseService.success(movies)
  }

  @Get(":id")
  @ApiOperation({ summary: "Returns a movie based on given id", security: [{ jwt: [] }] })
  @ApiParam({ name: "id", description: "id of the movie to get" })
  @ApiResponse({ status: HttpStatus.OK, description: "Generic response for get requests" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.REGULAR_USER)
  async getMovieById(@Param("id") id: string) {
    const movie = await this.moviesService.getMovieById(id)
    return this.responseService.success(movie)
  }

  @Post()
  @ApiOperation({ summary: "Creates a new movie", security: [{ jwt: [] }] })
  @ApiBody({ description: "data of the movie to create" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Generic response for post requests" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.REGULAR_USER)
  async createMovie(@Body() movie: object) {
    const result = await this.moviesService.createMovie(movie)
    return this.responseService.create(result)
  }
  
  @Put(":id")
  @ApiOperation({ summary: "Update a movie based on given id", security: [{ jwt: [] }] })
  @ApiParam({ name: "id", description: "id of the movie to update" })
  @ApiBody({ description: "data to be updated" })
  @ApiResponse({ status: HttpStatus.OK, description: "Generic response for put requests" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
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
  @ApiOperation({ summary: "Removes a movie based on given id", security: [{ jwt: [] }] })
  @ApiParam({ name: "id", description: "id of the movie to remove" })
  @ApiResponse({ status: HttpStatus.OK, description: "Generic response for delete requests" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  async removeMovie(@Param("id") id: string) {
    const result = await this.moviesService.removeMovie(id)
    return this.responseService.delete(result)
  }
}
