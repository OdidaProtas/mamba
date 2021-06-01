import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cart} from "./Cart";
import {Product} from "./Product";

@Entity()
export class CartItems {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Cart, cart => cart.items)
    cart: Cart;

    @ManyToOne(type => Product)
    product: Product

    @Column()
    quantity: number;
}
