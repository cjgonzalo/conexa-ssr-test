import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import SwapiInterface from './interfaces/swapi.interface';
import { SwapiResourcesInterface } from './interfaces/resources.interface';

@Injectable()
export class SwapiService{
  constructor(
    private readonly configService: ConfigService,
  ) {}

  async getResources(): Promise<SwapiResourcesInterface> {
    const swapiBaseUrl = this.configService.get("SWAPI_BASE_URL")

    if(!swapiBaseUrl) {
      throw new Error("Swapi url not defined")
    }
    const resources = await fetch(swapiBaseUrl)
    return await resources.json() as SwapiResourcesInterface
  }

  async getSwapiData(resource: string): Promise<SwapiInterface> {
    const response = await fetch(resource)
    return await response.json() as SwapiInterface
  }
}
