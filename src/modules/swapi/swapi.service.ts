import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SwapiInterface from './interfaces/swapi.interface';
import { SwapiResourcesInterface } from './interfaces/resources.interface';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SwapiService{
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async getResources(): Promise<SwapiResourcesInterface> {
    const swapiBaseUrl = this.configService.get("SWAPI_BASE_URL")

    if(!swapiBaseUrl) {
      throw new Error("Swapi url not defined")
    }
    const axiosResponse = await lastValueFrom(this.httpService.get(swapiBaseUrl))
    return axiosResponse.data
  }

  async getSwapiData(resource: string): Promise<SwapiInterface> {
    const axiosResponse = await lastValueFrom(this.httpService.get(resource))
    return axiosResponse.data
  }
}
