import {GeneralController, MessageController, PaymentController} from "./controller/PaymentController";


export const Routes = [{
    method: "get",
    route: "/",
    controller: GeneralController,
    action: "one"
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
}, {
    method: "post",
    route: "/mpesa/request",
    controller: PaymentController,
    action: "requestPayment"
}];
