import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Cart} from "./Cart";

@Entity()
export class Rider {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Cart, cart => cart.rider)
    carts: Cart[]

}
