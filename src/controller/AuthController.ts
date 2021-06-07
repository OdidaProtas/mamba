import {Request, Response, NextFunction} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class AuthController {

    userRepository = getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const user = await this.userRepository.findOneOrFail({phoneNumber: request.body.phoneNumber});
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
        console.log(accessToken)
        if (accessToken == null || accessToken == undefined) return response.sendStatus(400);
        return jwt.verify(accessToken, process.env.jwt_secret as string, async (err: any, user: any) => {
            console.log()
            if (err) return response.sendStatus(403);
            request.user = await new AuthController().userRepository.findOneOrFail({phoneNumber: user});
            next();
        });
    }

    async pass(request: Request, response: Response, next: NextFunction) {
        next();
    }

}

const generateToken = async (user: User, response: Response) => {
    let _token = await jwt.sign(user.phoneNumber.toString(), process.env.jwt_secret);
    const msg = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        token: _token,
        email: user.emailAddress
    }
    return response.send(msg);
}
