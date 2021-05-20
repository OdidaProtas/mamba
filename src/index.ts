import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";


createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());

    const allowedOrigins = ['http://localhost:3000'];
    const options: cors.CorsOptions = {
        origin: allowedOrigins
    }

    app.use(cors(options))

    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    app.listen(process.env.PORT);

    console.log("Express server has started");

}).catch(error => console.log(error));