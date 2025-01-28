import { Module } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[ConfigModule, HttpModule],
  providers: [SwapiService],
  exports: [SwapiService]
})
export class SwapiModule {}
