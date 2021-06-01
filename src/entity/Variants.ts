import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";

export enum VariantTypes {
    SIZE_VARIANT = "size",
    COLOR_VARIANTS = "color",
}

@Entity()
export default class Variants {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: VariantTypes,
        default: VariantTypes.COLOR_VARIANTS
    })
    type: VariantTypes;

    @Column()
    variation: string;

    @Column()
    image: string;


    @Column()
    price: number;


    @ManyToOne(type => Product, product => product.variants)
    product: Product;

}
