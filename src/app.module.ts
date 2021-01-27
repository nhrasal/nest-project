import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from './modules/crud/crud.module';
import { ormConfig } from './ENV';
import { BaseLogger } from './@logger/Base.logger';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './@interceptors/response.interceptor';
import { AllExceptionsFilter } from './@exceptions/AllExceptionsFilter';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: ormConfig.type,
      host: ormConfig.host,
      port: ormConfig.port,
      username: ormConfig.username, 
      password: ormConfig.password,
      database: ormConfig.database,
      autoLoadEntities: true,
      synchronize: true,
      autoReconnect: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './uploads'),
    }),
  CrudModule
  ],

  // controllers: [AppController],
  // providers: [AppService],

  providers: [
    BaseLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {} 
