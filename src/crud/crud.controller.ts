import { Controller, Get, Query } from '@nestjs/common';
import { CrudService } from './crud.service';

@Controller('crud')
export class CrudController {

    constructor(private readonly crudService: CrudService) { }

    @Get()
  async findAll(@Query() query: any): Promise<any> {  
    return await this.crudService.findAll(
      query
    );
  }
}
