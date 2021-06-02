import {paymentRoutes} from "./routes/PaymnetRoutes";
import {productRoutes} from "./routes/ProductRoutes";
import {cartRoutes} from "./routes/CartRoutes";
import {userRoutes} from "./routes/UserRoutes";
import {shopRoutes} from "./routes/ShopRoutes";
import {riderRoutes} from "./routes/RiderRoutes";
import {cartItemRoutes} from "./routes/CartItemRoutes";

import {Request, Response, NextFunction} from "express";
import {authRoutes} from "./routes/AuthRoutes";

export class Index {
    async index(request: Request, response: Response, next: NextFunction) {
        return "<h1>Art<span style='color: #ff0000'>i</span>k<h1/>";
    }

}

const homeRoute = {
    method: "get",
    route: "/",
    controller: Index,
    action: "index"
}

export const Routes = [
    homeRoute,
    ...paymentRoutes,
    ...productRoutes,
    ...cartRoutes,
    ...userRoutes,
    ...shopRoutes,
    ...riderRoutes,
    ...cartItemRoutes,
    ...authRoutes,
];

