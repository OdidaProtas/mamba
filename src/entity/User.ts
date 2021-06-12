import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, OneToOne, JoinColumn} from "typeorm";
import {Cart} from "./Cart";
import {Shop} from "./Shop";

export enum UserRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    CUSTOMER = "customer",
    RIDER = "rider",
    MERCHANT = "merchant"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role: UserRole;

    @Column({
        type: "timestamp",
        default: "now()"
    })
    dateJoined: string;

    @Column()
    emailAddress: string;

    @Column({
        unique: true
    })
    phoneNumber: number;

    @Column()
    password: string;

    @OneToMany(type => Cart, cart => cart.customer)
    @JoinTable()
    carts: Cart[];

    @OneToOne(type => Shop, shop => shop.user)
    shops: Shop

}
