import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudController } from './crud.controller';
import { Crud } from './crud.entity';
import { CrudService } from './crud.service';



const ENTITIES = [Crud];
const SERVICES = [CrudService];
const CONTROLLERS = [
  CrudController
];
// const SUBSCRIBERS = [UserSubscriber];

@Module({
  imports: [TypeOrmModule.forFeature([...ENTITIES])],
  providers: [
    ...SERVICES,
    // ...SUBSCRIBERS,
    ...CONTROLLERS,
  ],
  controllers: [...CONTROLLERS],
  exports: [...SERVICES, ...CONTROLLERS],
})

export class CrudModule {}
