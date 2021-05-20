import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class MpesaExpress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: number;

    @Column()
    amount: number;
}
