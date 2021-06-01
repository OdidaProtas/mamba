import {getRepository} from "typeorm";
import {Rider} from "../entity/Rider";
import {Request, Response, NextFunction} from "express";

export class RiderController{

    riderRepository = getRepository(Rider);

    async save(request: Request, response: Response, next: NextFunction) {
        return this.riderRepository.save(request.body);
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.riderRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.riderRepository.findByIds([request.params.id])
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.riderRepository.update(request.params.id, request.body)
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        return this.riderRepository.softDelete(request.params.id)
    }
}
