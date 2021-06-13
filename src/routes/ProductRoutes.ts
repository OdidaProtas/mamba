import {ProductsController} from "../controller/ProductsController";

export const productRoutes = [
    {
        method: "post",
        route: "/products/save",
        controller: ProductsController,
        action: "save"
    },
    {
        method: "get",
        route: "/products/all",
        controller: ProductsController,
        action: "all"
    },
    {
        method: "get",
        route: "/products/:id",
        controller: ProductsController,
        action: "one"
    },
    {
        method: "delete",
        route: "products/:id/delete",
        controller: ProductsController,
        action: "remove"
    },
    {
        method: "patch",
        route: "products/:id/update",
        controller: ProductsController,
        action: "update"
    }
]
