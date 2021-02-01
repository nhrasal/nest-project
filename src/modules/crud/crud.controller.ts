import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { ENV } from 'src/ENV';
import { fixNullPrototype, storageOptions } from 'src/utils/utilFunc.util';
import { CrudDto } from '../dtos/crudDto';
import { UpdateCrudDto } from '../dtos/UpdateCrudDto';
import { CrudService } from './crud.service';

@Controller('crud')
export class CrudController extends BaseController<CrudDto, {}> {
  constructor(private readonly service: CrudService) {
    super(service, []);
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


  @Put(":id")
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateCrudDto })
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor("formImage", {
      storage: storageOptions,
      limits: { fileSize: ENV.IMAGE_MAX_SIZE },
    })
  )
  async update(@Param("id") id: string, @Body() data:UpdateCrudDto): Promise<any> {
     data = await fixNullPrototype(data);
    return this.service.updateOneWithSingleImage(id, data);
  }

}
