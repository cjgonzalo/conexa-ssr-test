import { Module } from '@nestjs/common';
import { ResponseService } from './responses.service';

@Module({
  providers: [ResponseService],
  exports: [ResponseService]
})

export class SharedModule {}