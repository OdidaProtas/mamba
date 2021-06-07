import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Merchant {

    @PrimaryGeneratedColumn()
    id: number;

}
