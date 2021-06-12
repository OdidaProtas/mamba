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
        nullable: true
    })
    purchasePrice: number;


    @Column({
        nullable: true
    })
    retailPrice: number;

    @Column({
        nullable: true
    })
    quantity: number;


    @Column({
        nullable: true
    })
    expiryDate: string;

    @Column({
        nullable: true,
    })
    barcode: number;

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
