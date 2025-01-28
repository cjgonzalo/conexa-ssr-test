import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MoviesModule } from '../movies/movies.module';
import { SharedModule } from '../shared/shared.module';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DynamicModelService } from '../shared/dynamic-model.service';
import { MoviesService } from '../movies/movies.service';
import { SwapiModule } from '../swapi/swapi.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("DATABASE_URI")
      })
    }),
    ScheduleModule.forRoot(),
    SharedModule,
    UsersModule,
    RolesModule,
    AuthModule,
    MoviesModule,
    SwapiModule
  ],
  providers: [AppService, DynamicModelService, MoviesService]
})

export class AppModule {}