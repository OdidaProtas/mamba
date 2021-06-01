import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Merchant} from "./Merchant";
import {Product} from "./Product";

@Entity()
export class Shop {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mame: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    location: string;

    @ManyToOne(type => Merchant, merchant => merchant.shop)
    merchant: Merchant;

    @OneToMany(type => Product, product=>product.shop)
    @JoinTable()
    products: Product[];
}
