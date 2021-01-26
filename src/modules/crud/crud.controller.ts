import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { ENV } from 'src/ENV';
import { fixNullPrototype, storageOptions } from 'src/utils/utilFunc.util';
import { CrudDto } from '../dtos/crudDto';
import { CrudService } from './crud.service';

@Controller('crud')
export class CrudController extends BaseController<{}, {}> {
  constructor(private readonly service: CrudService) {
    super(service, []);
  }
  @Get()
  async findAll(@Query() query: any): Promise<any> {
    query.searchAttributes = ["name", "slug"];
    return await this.service.findAllWithPaginate(query, this.modelRelations);
  }
  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CrudDto })
  @UsePipes(ValidationPipe)

  @UseInterceptors(
    FileInterceptor("formImage", {
      storage: storageOptions,
      limits: { fileSize: ENV.IMAGE_MAX_SIZE },
    })
  )
  async createOne(
    @UploadedFile() formImage,
    @Body() data: CrudDto,
  ): Promise<any> {
    data = await fixNullPrototype(data);
    data.formImage = formImage;
    return await this.service.insertOneWithSingleImage(data);
  }

}
