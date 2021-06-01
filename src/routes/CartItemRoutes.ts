import {CartItemController} from "../controller/CartItemController";

export const cartItemRoutes = [

    {
        method: "post",
        route: "/cart-item/save",
        controller: CartItemController,
        action: "save"
    },
    {
        method: "get",
        route: "/cart-item/all",
        controller: CartItemController,
        action: "all"
    },
    {
        method: "get",
        route: "/cart-item/:id",
        controller: CartItemController,
        action: "one"
    },
    {
        method: "patch",
        route: "/cart-item/:id/update",
        controller: CartItemController,
        action: "update"
    },
    {
        method: "delete",
        route: "/cart-item/:id/delete",
        controller: CartItemController,
        action: "delete"
    },
]
