import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Merchant} from "./Merchant";
import {Product} from "./Product";

export enum BusinessCategory {
    BEAUTY_AND_FASHION = "beauty_and_fashion",
    FOOD_AND_BEVERAGES = "food_and_beverages",
    ELECTRONICS = "electronics",
    GENERAL = "general"
}

@Entity()
export class Shop {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mame: string;

    @Column({
        nullable: true,
    })
    tagLine: string;

    @Column()
    businessPhoneNumber: string;

    @Column({
        type: "enum",
        enum: BusinessCategory,
        default: BusinessCategory.GENERAL
    })
    category: string;

    @Column({
        nullable: true
    })
    logoUri: string;

    @Column({
        default: false
    })
    socialMedia: boolean;

    @Column({
        default: false
    })
    artik: boolean;

    @Column({
        default: false
    })
    store: boolean;

    @Column({
        nullable: true
    })
    latitude: string;

    @Column({
        nullable: true
    })
    longitude: string

    @ManyToOne(type => Merchant, merchant => merchant.shop)
    merchant: Merchant;

    @OneToMany(type => Product, product => product.shop)
    @JoinTable()
    products: Product[];
}
