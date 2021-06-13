import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Shop} from "./Shop";
import Variants from "./Variants";
import {truncate} from "fs";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;


    @Column({
        nullable: true,
        default: 0
    })
    purchasePrice: string;


    @Column({
        nullable: true
    })
    retailPrice: string;

    @Column({
        default: 0
    })
    quantity: string;


    @Column({
        type: "date"
    })
    expiryDate: string;

    @Column({
        nullable: true,
    })
    barcode: string;

    @Column({
        nullable: true
    })
    imageUrl: string;

    @Column({
        default: false
    })
    isPublished: boolean;

    @ManyToOne(type => Shop, shop => shop.products)
    shop: Shop;

    @OneToMany(type => Variants, variant => variant.product)
    @JoinTable()
    variants: Variants[];

}
