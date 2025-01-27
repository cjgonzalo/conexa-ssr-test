import { Module } from '@nestjs/common';
import { ResponseService } from './responses.service';
import { DynamicModelService } from './dynamic-model.service';
import { SwapiModule } from '../swapi/swapi.module';
import { SwapiService } from '../swapi/swapi.service';

@Module({
  imports: [SwapiModule],
  providers: [ResponseService, DynamicModelService, SwapiService],
  exports: [ResponseService, DynamicModelService]
})

export class SharedModule {}