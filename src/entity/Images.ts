import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Images {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    imageUrl: string;
}
