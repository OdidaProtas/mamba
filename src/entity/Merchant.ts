import {Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Shop} from "./Shop";

@Entity()
export class Merchant {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Shop, shop => shop.merchant)
    @JoinTable()
    shop: Shop[];
}
