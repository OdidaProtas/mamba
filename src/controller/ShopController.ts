import {getRepository} from "typeorm";
import {Request, Response, NextFunction} from "express";
import {Shop} from "../entity/Shop";
import {User} from "../entity/User";

export class ShopController {

    shopRepository = getRepository(Shop)
    userRepository = getRepository(User)

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
        let user = await this.userRepository.findOne(request.params.id);
        return await this.shopRepository.find({user: user});
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.update(request.params.id, request.body);
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.shopRepository.delete(request.params.id);
    }

}
