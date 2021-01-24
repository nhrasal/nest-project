import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudModule } from './crud/crud.module';
import { ormConfig } from './ENV';

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
  CrudModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
