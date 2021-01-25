import { Scope } from "typeorm-scope";

import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { BaseEntity } from "../../base/base.entity";

@Scope<Crud>([(qb, alias) => qb.andWhere(`${alias}.deletedAt IS NULL`)])
@Entity("cruds")
export class Crud extends BaseEntity {
   
    @Column({nullable:true})
    firstName: string;

    @Column({nullable:true})
    lastName: string;

    @Column({nullable:true})
    phoneNumber: number;

    @Column({nullable:true})
    address: string;
    
    @Column({nullable:true})
    image: string;

    @Column({nullable:true})
    age: string;
    
    constructor() {
        super();
      }
}
