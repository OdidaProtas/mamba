import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Shop} from "./Shop";
import Variants from "./Variants";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @ManyToOne(type => Shop, shop => shop.products)
    shop: Shop;

    @OneToMany(type => Variants, variant => variant.product)
    @JoinTable()
    variants: Variants[];


}
