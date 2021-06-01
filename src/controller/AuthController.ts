import {Request, Response, NextFunction} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/User";

export class AuthController {

    userRepository = getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {

    }

    async refresh(request: Request, response: Response, next: NextFunction) {

    }

    async authenticateToken(request: Request, response: Response, next: NextFunction) {
        const accessToken = request.headers["access_token"];
        next();
    }

}
