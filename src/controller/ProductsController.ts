import {getRepository} from "typeorm";
import {Product} from "../entity/Product";
import {NextFunction, Request, Response} from "express";
import {Shop} from "../entity/Shop";

export class ProductsController {

    productsRepository = getRepository(Product);
    shopRepository = getRepository(Shop);

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            return this.productsRepository.save(request.body);
        } catch (e) {
            return response.status(400);
        }
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productsRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.productsRepository.findByIds([request.params.id])
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.productsRepository.update(request.params.id, request.body)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        return this.productsRepository.softDelete(request.params.id)
    }

    async byShop(request: Request, response: Response, next: NextFunction) {
        return this.productsRepository.find({shop: request.params.id})
    }

}

