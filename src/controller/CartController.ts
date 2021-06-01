import {Request, Response, NextFunction} from "express";
import {getRepository} from "typeorm";
import {Cart} from "../entity/Cart";

export class CartController {

    cartRepository = getRepository(Cart);

    async save(request: Request, response: Response, next: NextFunction) {
        return this.cartRepository.save(request.body);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.cartRepository.findByIds([request.params.id])
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.cartRepository.find();
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.cartRepository.update(request.params.id, request.body)
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.cartRepository.softDelete(request.params.id)
    }
}
