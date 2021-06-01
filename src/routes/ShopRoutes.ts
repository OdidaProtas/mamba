import {ShopController} from "../controller/ShopController";

export const shopRoutes = [
    {
        method: "post",
        route: "/shops/save",
        controller: ShopController,
        action: "save"
    },
    {
        method: "get",
        route: "/shops/all",
        controller: ShopController,
        action: "all"
    },
    {
        method: "get",
        route: "/shops/:id",
        controller: ShopController,
        action: "one"
    },
    {
        method: "patch",
        route: "/shops/:id/update",
        controller: ShopController,
        action: "update"
    },
    {
        method: "delete",
        route: "/shops/:id/delete",
        controller: ShopController,
        action: "delete"
    },

]
