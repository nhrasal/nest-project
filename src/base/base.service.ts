import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllSuccessResponse } from 'src/@responses/findAllSuccess.response';
import { CrudDto } from 'src/modules/dtos/crudDto';
import { paginationOptions } from 'src/utils/paginate.util';
import { IServerFileUploaderReturn, ServerFileUploader } from 'src/utils/serverFileHandler.util';
import { FindManyOptions, Raw, Repository } from 'typeorm';

@Injectable()
export abstract class BaseService<Entity> extends Repository<Entity> {
  repo: Repository<Entity>;
  entity: Entity;

  constructor(private repository: any) {
    super();
    this.repo = this.repository;
  }

   async findAllWithPaginate(options: any, relations?: string[]): Promise<any> {
    console.log("call from find All With Paginate");
    const searchTerm = options.searchTerm;
    const searchAttributes = options.searchAttributes || ["name"];
    delete options.searchAttributes;
    delete options.searchTerm;

    if (options.take && options.take === "all") {
      delete options.take;
      delete options.page;
      let orWhere: any = { ...options };

      if (searchTerm) {
        orWhere = [];
        if (searchAttributes) {
          searchAttributes.map((item: string) => {
            let dd = { ...options };
            dd[item] = Raw((alias) => `${alias} ILIKE '%${searchTerm}%'`);

            orWhere.push(dd);
          });
        }
      }
      if (options.order) {
        options.order =
          typeof options.order === "string"
            ? JSON.parse(options.order)
            : options.order;
      } else {
        options.order = { updatedAt: "DESC" };
      }
      delete orWhere.order;
      options.where = orWhere;

      options.relations = relations;

      const payload = await this.repo.findAndCount(options);
      return new FindAllSuccessResponse({
        payload: payload[0],
        total: payload[1],
        take: "all",
        page: false,
      });
    } else {
      const pOptions: any = paginationOptions(options);
      pOptions.page = options.page;
      delete options.page;
      delete options.take;

      let orWhere: any = { ...options };

      if (searchTerm) {
        orWhere = [];

        if (searchAttributes) {
          searchAttributes.map((item: string) => {
            let dd = { ...options };
            dd[item] = Raw((alias) => `${alias} ILIKE '%${searchTerm}%'`);

            orWhere.push(dd);
          });
        }
      }

      if (options.order) {
        options.order =
          typeof options.order === "string"
            ? JSON.parse(options.order)
            : options.order;
      } else {
        options.order = { updatedAt: "DESC" };
      }
      pOptions.order = options.order;

      delete orWhere.order;
      pOptions.where = orWhere;

      if (relations) {
        pOptions.relations = relations;
      }

      const payload = await this.repo.findAndCount(pOptions);

      return new FindAllSuccessResponse({
        payload: payload[0],
        total: payload[1],
        page: pOptions.page,
        take: pOptions.take,
      });
    }
  }

  async insertOneWithSingleImage(data: any): Promise<any> {
    console.log("call from Base Service - insertOneWithSingleImage");
    const newPayload = { ...data };
    const payload1 = await this.repo.save(newPayload);
    // return payload1;
  
    if (data.formImage) {
      // upload newfile to server & delete from local
      const uploadedFile: IServerFileUploaderReturn = await ServerFileUploader(
        data.formImage
      );
      if (uploadedFile.success) {
        // console.log(data.formImage);
        // return 
        // data.image = data.formImage = uploadedFile.storedFiles[0];
        data.image = data?.formImage?.path || "" ;
      }
    }
    delete data.formImage;
    data.id = payload1.id;
    const payload= await this.repo.save(data)
    return payload;
  }
 
  
}
