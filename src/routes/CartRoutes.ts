import {CartController} from "../controller/CartController";

export const cartRoutes = [
    {
        method: "post",
        route: "/carts/save",
        controller: CartController,
        action: "save"
    },
    {
        method: "get",
        route: "/carts/all",
        controller: CartController,
        action: "all"
    },
    {
        method: "get",
        route: "/carts/:id",
        controller: CartController,
        action: "one"
    },
    {
        method: "patch",
        route: "/carts/:id/update",
        controller: CartController,
        action: "update"
    },
    {
        method: "delete",
        route: "/carts/:id/delete",
        controller: CartController,
        action: "delete"
    },

]
