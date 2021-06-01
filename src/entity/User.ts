import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import {Cart} from "./Cart";

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

    @Column()
    age: number;

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

    @Column()
    phoneNumber: number;

    @Column()
    password: string;

    @OneToMany(type => Cart, cart => cart.customer)
    @JoinTable()
    carts: Cart[];

    async encryptPassword() {
        this.password = "";
    }

    async decryptPassword(password) {
        return this.password != password;
    }

}
