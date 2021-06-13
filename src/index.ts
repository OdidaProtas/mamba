import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as path from "path";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {AuthController} from "./controller/AuthController";
import fileUpload from "express-fileupload";

createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());

    const allowedOrigins = ['http://localhost:3000'];
    const options: cors.CorsOptions = {
        origin: allowedOrigins
    }

    app.use(cors());
    app.use(fileUpload());

    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, "static"))

    const pass = new AuthController().pass;
    const intercept = new AuthController().frisk;

    Routes.forEach(route => {
        (app as any)[route.method](route.route,

            route.route === "/login" ? pass : route.route === "/" ? pass : route.route === "/signup" ? pass : intercept,

            (req: Request, res: Response, next: Function) => {

                const result = (new (route.controller as any))[route.action](req, res, next);

                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
    });

    app.listen(process.env.PORT);

    console.log(`Express server has started on port ${process.env.PORT}`);

}).catch(error => console.log(error));
