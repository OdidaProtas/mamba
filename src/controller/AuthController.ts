import {Request, Response, NextFunction} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class AuthController {

    userRepository = getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findOneOrFail({phoneNumber: request.body.phoneNumber}, {relations: ["shops"]});
            if (bcrypt.compareSync(request.body.password, user.password)) return generateToken(user, response);
            return response.sendStatus(403);
        } catch (e) {
            response.sendStatus(404);
        }
    }


    async signup(request: Request, response: Response, next: NextFunction) {
        request.body["password"] = bcrypt.hashSync(request.body.password, 8)
        return this.userRepository.save(request.body);
    }

    async frisk(request: Request, response: Response, next: NextFunction) {
        const accessToken = request.headers["access_token"];
        if (accessToken == null || accessToken == undefined) return response.sendStatus(400);
        return jwt.verify(accessToken, process.env.jwt_secret as string, async (err: any, user: any) => {
            if (err) return response.sendStatus(403);
            request.user = await new AuthController().userRepository.findOneOrFail({phoneNumber: user.phoneNumber});
            next();
        });
    }

    async pass(request: Request, response: Response, next: NextFunction) {
        next();
    }

}

const generateToken = async (user: User, response: Response) => {
    const msg = {
        id: user.id,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddress,
        shops: user.shops
    }
    console.log(user)
    let _token = jwt.sign(JSON.stringify(msg), process.env.jwt_secret);
    return response.send(_token);
}
