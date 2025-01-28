import { Module } from '@nestjs/common';
import { ResponseService } from './responses.service';
import { DynamicModelService } from './dynamic-model.service';
import { SwapiModule } from '../swapi/swapi.module';

@Module({
  imports: [SwapiModule],
  providers: [ResponseService, DynamicModelService],
  exports: [ResponseService, DynamicModelService]
})

export class SharedModule {}