import { Injectable } from '@nestjs/common';
import { DynamicModelService } from '../shared/dynamic-model.service';
import { allPopulations } from './movies.populations';
import { Types } from 'mongoose';

@Injectable()
export class MoviesService {
  private model: string

  constructor(private readonly dynamicModelService: DynamicModelService) {
    this.model = "films"
  }

  async getMovies() {
    return await this
      .dynamicModelService
      .getModel(this.model)
      .find()
      .populate(allPopulations)
  }

  async getMovieById(id: string) {
    return await this
      .dynamicModelService
      .getModel(this.model)
      .findOne({ id })
      .populate(allPopulations)
  }

  async createMovie(movie: object) {
    const filmsModel = this.dynamicModelService.getModel(this.model)
    const newMovie = new filmsModel({ _id: new Types.ObjectId(), ...movie })
    return await newMovie.save()
  }
  
  async updateMovie(id: string, updates: object) {
    return this
    .dynamicModelService
    .getModel(this.model)
    .findOneAndUpdate({ id }, { $set: updates })
  }

  async removeMovie(id: string) {
    return await this
      .dynamicModelService
      .getModel(this.model)
      .findOneAndDelete({ id })
  }
}
