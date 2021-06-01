import {Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CartItems} from "./CartItems";
import {Rider} from "./Rider";
import {Payment} from "./Payment";
import {User} from "./User";

export enum CartStatus {
    EMPTY = "empty",
    ORDERED = "ordered",
    DELIVERED = "delivered",
}

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: CartStatus,
        default: CartStatus.ORDERED,
    })
    status: CartStatus;

    @OneToMany(type => CartItems, items => items.cart)
    @JoinTable()
    items: CartItems[];


    @ManyToOne(type => User, user => user.carts)
    customer: User;

    @ManyToOne(type => Rider, rider => rider.carts)
    rider: Rider

    @OneToOne(type => Payment, payment => payment.cart)
    payment: Payment;

}
