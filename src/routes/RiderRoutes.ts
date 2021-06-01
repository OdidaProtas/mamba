import {RiderController} from "../controller/RiderController";

export const riderRoutes = [
    {
        method: "post",
        route: "/rider/save",
        controller: RiderController,
        action: "save"
    },
    {
        method: "get",
        route: "/shops/all",
        controller: RiderController,
        action: "all"
    },
    {
        method: "get",
        route: "/riders/:id",
        controller: RiderController,
        action: "one"
    },
    {
        method: "patch",
        route: "/riders/:id/update",
        controller: RiderController,
        action: "update"
    },
    {
        method: "delete",
        route: "/riders/:id/delete",
        controller: RiderController,
        action: "delete"
    },

]
