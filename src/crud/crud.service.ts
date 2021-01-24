import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crud } from './crud.entity';

@Injectable()
export class CrudService {
    constructor(
        @InjectRepository(Crud) private readonly _repository: Repository<Crud>
      ) {}

      async findAll(query: any): Promise<any> {
        console.log("call from crud service  : findAll");
        return this._repository.find()
      }
}
