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
    phoneNumber: string;

    @Column()
    password: string;


    async encryptPassword() {
        this.password = "";
    }

    async decryptPassword(password) {
        return this.password != password;
    }

}
