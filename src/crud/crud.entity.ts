import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("cruds")
export class Crud {
    @PrimaryGeneratedColumn()
    id: number;

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

    @Column({nullable:true})
    createdAt: Date;

    @Column({nullable:true})
    updatedAt:   Date;
}
