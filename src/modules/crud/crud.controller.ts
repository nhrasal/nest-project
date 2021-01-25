import { Controller, Get, Query } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { CrudService } from './crud.service';

@Controller('crud')
export class CrudController extends BaseController<{}, {}> {
  constructor(private readonly service: CrudService) {
    super(service, []);
  }
  @Get()
  // @CleanParams()
  async findAll(@Query() query: any): Promise<any> {
    query.searchAttributes = ["name", "slug"];
    return await this.service.findAllWithPaginate(query, this.modelRelations);
  }

}
