import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { IServerFileUploaderReturn, ServerFileUploader } from 'src/utils/serverFileHandler.util';
import { Repository } from 'typeorm';
import { Crud } from './crud.entity';

@Injectable()
export class CrudService extends BaseService<Crud> {
  constructor(
		@InjectRepository(Crud)
		private readonly _repository: Repository<Crud>
	) {
		super(_repository);
	}
	async findOneSomething(id:any): Promise<any>{
		return this._repository.findOne(id)
	}
	
	
}
