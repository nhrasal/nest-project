import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from './crud/crud.module';
import { ormConfig } from './ENV';

@Module({
  imports: [
    TypeOrmModule.forRoot({
       "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "nest",
        "password": "123456",
        "database": "nest_crud",
        "synchronize": true,
        "logging": false,
        "autoLoadEntities":true,
        


      // "type": ormConfig.type,
      // "host": ormConfig.host,
      // "port": ormConfig.port,
      // "username": ormConfig.username,
      // "password": ormConfig.password,
      // "database": ormConfig.database,
      // "autoLoadEntities": true,
      // "synchronize": true,
      // "autoReconnect": true, 

      // type: ormConfig.type,
      // host: ormConfig.host,
      // port: ormConfig.port,
      // username: ormConfig.username,
      // password: ormConfig.password,
      // database: ormConfig.database,
      // autoLoadEntities: true,
      // synchronize: true,
      // autoReconnect: true, 
    }),
  CrudModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}