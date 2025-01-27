import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { populateDatabase } from './db/swapi-db';

@Injectable()
export class SwapiService implements OnModuleInit{
  constructor(private readonly configService: ConfigService) {}

  private async getResources(): Promise<Object> {
    const swapiBaseUrl = this.configService.get("SWAPI_BASE_URL")

    if(!swapiBaseUrl) {
      throw new Error("Swapi url not defined")
    }
    const resources = await fetch(swapiBaseUrl)
    return await resources.json()
  }

  async onModuleInit() {
    const resources = await this.getResources()
    for(const resource of Object.values(resources)) {
      await populateDatabase(resource)
    }
  }
}
