import {PaymentController, GeneralController, MessageController, PaymentController} from "./controller/PaymentController";


export const Routes = [{
    method: "get",
    route: "/",
    controller: GeneralController,
    action: "one"
}, {
    method: "get",
    route: "/users",
    controller: PaymentController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: PaymentController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: PaymentController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: PaymentController,
    action: "remove"
}, {
    method: "post",
    route: "/message",
    controller: MessageController,
    action: "save"
}, {
    method: "get",
    route: "/messages",
    controller: MessageController,
    action: "all"
}, {
    method: "post",
    route: "/mpesa/hook",
    controller: PaymentController,
    action: "save"
},{
    method: "post",
    route: "/mpesa/request",
    controller: PaymentController,
    action: "requestPayment"
}];
