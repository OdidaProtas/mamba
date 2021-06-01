import {getRepository} from "typeorm";
import {CartItems} from "../entity/CartItems";
import {Request, Response, NextFunction} from "express";

export class CartItemController {

    itemRepository = getRepository(CartItems);

    async save(request: Request, response: Response, next: NextFunction) {
        return this.itemRepository.save(request.body);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.itemRepository.findByIds([request.params.id]);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.itemRepository.find();
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.itemRepository.update(request.params.id, request.body)
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.itemRepository.softDelete(request.params.id)
    }
}
