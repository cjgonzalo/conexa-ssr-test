import { Injectable } from '@nestjs/common';
import SwapiInterface from './interfaces/swapi.interface';
import { SwapiResourcesInterface } from './interfaces/resources.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SwapiService {
  private swapiBaseUrl: string
  constructor(
    private readonly httpService: HttpService
  ) {
    this.swapiBaseUrl = "https://swapi.dev/api/"
  }

  async getResources(): Promise<SwapiResourcesInterface> {
    const axiosResponse = await lastValueFrom(this.httpService.get(this.swapiBaseUrl))
    return axiosResponse.data
  }

  async getSwapiData(resource: string): Promise<SwapiInterface> {
    const axiosResponse = await lastValueFrom(this.httpService.get(resource))
    return axiosResponse.data
  }
}
