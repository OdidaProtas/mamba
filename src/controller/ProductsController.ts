import {getRepository} from "typeorm";
import {Product} from "../entity/Product";
import {NextFunction, Request, Response} from "express";

export class ProductsController {

    productsRepository = getRepository(Product);

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            return this.productsRepository.save(request.body);
        } catch (e) {
            console.log(e);
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

}

