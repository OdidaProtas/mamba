import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {User} from "./User";

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

    @Column({
        unique: true,
    })
    name: string;

    @Column({
        nullable: true,
    })
    tagLine: string;

    @Column({
        unique: true
    })
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

    @Column({
        default: false
    })
    hasDelivery: boolean;

    @OneToOne(type => User, user => user.shops)
    @JoinColumn()
    user: User;

    @OneToMany(type => Product, product => product.shop)
    @JoinTable()
    products: Product[];
}
