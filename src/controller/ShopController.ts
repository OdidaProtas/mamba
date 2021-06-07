import {getRepository} from "typeorm";
import {Request, Response, NextFunction} from "express";
import {Shop} from "../entity/Shop";

export class ShopController {

    shopRepository = getRepository(Shop)

    async save(request: Request, response: Response, next: NextFunction) {
        request.body["user"] = request.user
        return this.shopRepository.save(request.body);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.findByIds([request.params.id])
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.update(request.params.id, request.body)
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.softDelete(request.params.id)
    }

}
