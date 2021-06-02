import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {Request, Response, NextFunction} from "express";

export class UserController {

    userRepository = getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findByIds([request.params.id])
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.update(request.params.id, request.body)
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.softDelete(request.params.id)
    }

}
