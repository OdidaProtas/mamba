import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Promos{

    @PrimaryGeneratedColumn()
    id: number;
}
