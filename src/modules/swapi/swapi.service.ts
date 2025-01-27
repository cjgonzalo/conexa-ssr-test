import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import SwapiInterface from '../shared/interfaces/swapi.interface';

@Injectable()
export class SwapiService{
  constructor(
    private readonly configService: ConfigService,
  ) {}

  async getResources(): Promise<string[]> {
    const swapiBaseUrl = this.configService.get("SWAPI_BASE_URL")

    if(!swapiBaseUrl) {
      throw new Error("Swapi url not defined")
    }
    const resources = await fetch(swapiBaseUrl)
    const urls = await resources.json() as Object
    return Object.values(urls)
  }

  async getSwapiData(resource: string): Promise<SwapiInterface> {
    const response = await fetch(resource)
    return await response.json() as SwapiInterface
  }
}
