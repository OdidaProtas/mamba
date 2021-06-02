import {AuthController} from "../controller/AuthController";

export const authRoutes = [
    {
        method: "post",
        route: "/login",
        controller: AuthController,
        action: "login",
    },
    {
        method: "post",
        route: "/signup",
        controller: AuthController,
        action: "signup"
    }
]
