import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SwapiService } from '../swapi/swapi.service';
import { DynamicModelService } from '../shared/dynamic-model.service';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class AppService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly moviesService: MoviesService,
    private readonly dynamicModelService: DynamicModelService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncDatabase() {
    try {
      console.log("Iniciando sincronizacion de la base de datos")

      const { films } = await this.swapiService.getResources()
      let swapiData = await this.swapiService.getSwapiData(films)
      const swapiFilms = swapiData.results
  
      while(swapiData.next) {
        swapiData = await this.swapiService.getSwapiData(swapiData.next)
        swapiFilms.push(...swapiData.results)
      }
      
      const dbFilms = await this.moviesService.getMovies()
  
      const desyncFilms = swapiFilms
        .filter(({ url }) => 
          !dbFilms.map(({ id }) => id).includes(Number(this.dynamicModelService.extractLastSegment(url)))
        )
  
      await this
        .dynamicModelService
        .insertDocuments(
          this.dynamicModelService.getModel("films"), desyncFilms
        )
      
      console.log(`La base de datos se sincronizo correctamente con SWAPI, se reinsertaron ${desyncFilms.length} registros`)
    } catch(error) {
      console.error("Ocurrió un error al sincronizar la base de datos con SWAPI")
      error.code && console.error(`Código de error: ${error.code}`)
      error.message && console.error(`Detalle de error: ${error.message}`)
    }
    
  }
}
