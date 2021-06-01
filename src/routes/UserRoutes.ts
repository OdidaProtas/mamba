import {UserController} from "../controller/UserController";

export const userRoutes = [
    {
        method: "post",
        route: "/users/save",
        controller: UserController,
        action: "save"
    },
    {
        method: "get",
        route: "/users/all",
        controller: UserController,
        action: "all"
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    },
    {
        method: "patch",
        route: "/users/:id/update",
        controller: UserController,
        action: "update"
    },
    {
        method: "delete",
        route: "/users/:id/delete",
        controller: UserController,
        action: "delete"
    },
]
