import {getRepository} from "typeorm";
import {Request, Response, NextFunction} from "express";
import {Shop} from "../entity/Shop";
import {UserController} from "./UserController";
import {AuthController} from "./AuthController";

export class ShopController {

    shopRepository = getRepository(Shop)

    async save(request: Request, response: Response, next: NextFunction) {
        let user = request.user
        request.body["user"] = user;
        return this.shopRepository.save(request.body);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.findByIds([request.params.id])
    }

    async byUser(request: Request, response: Response, next: NextFunction) {
        let user = await new AuthController().userRepository.findOne(request.params.id);
        return await this.shopRepository.find({user: user});
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.update(request.params.id, request.body);
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.softDelete(request.params.id);
    }

}
