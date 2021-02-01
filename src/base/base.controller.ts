import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ENV } from 'src/ENV';
import { fixNullPrototype, storageOptions } from 'src/utils/utilFunc.util';

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
  
  @Get(":id")
  async findOne(@Param("id") id:string):Promise<any>{
    return this.modelService.findById(id,this.modelService)
  }

 
}
