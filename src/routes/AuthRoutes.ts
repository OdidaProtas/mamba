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
        route: "/refresh-token",
        controller: AuthController,
        action: "refresh"
    }
]
