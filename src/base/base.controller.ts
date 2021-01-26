import { Controller, Get, Query } from '@nestjs/common';

export abstract class BaseController<CreateDto, UpdateDto> {
  modelService: any;
  modelRelations: any;
  constructor(private _modelService: any, private _modelRelations?: string[]) {
    this.modelService = this._modelService;
    this.modelRelations = this._modelRelations;
  }
  @Get()
  async findAll(@Query() query: any): Promise<any> {
    return await this.modelService.findAllWithPaginate(
      query,
      this.modelRelations
    );
  }
}
