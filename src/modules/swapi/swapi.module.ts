import { Module } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule],
  providers: [SwapiService],
})
export class SwapiModule {}
