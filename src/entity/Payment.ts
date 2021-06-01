import {Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Cart} from "./Cart";


export enum PaymentStatus {
    PENDING_PAYMENT = "pending_payment",
    PAYMENT_APPROVED = "payment_approved",
    PAYMENT_UNSUCCESSFUL = "payment_unsuccessful",
    PROCESSING_PAYMENT = "processing_payment"
}


@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: PaymentStatus,
        default: PaymentStatus.PENDING_PAYMENT
    })
    status: PaymentStatus;

    @Column()
    description: string;

    @OneToOne(type => Cart, cart => cart.payment)
    @JoinTable()
    cart: Cart;
}
