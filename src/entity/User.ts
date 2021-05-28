import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
        default: UserRole.CUSTOMER
    })
    role: UserRole;

    @Column({
        type: "timestamp",
        default: "now()"
    })
    dateJoined: string;

}
