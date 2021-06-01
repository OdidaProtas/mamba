import {PaymentController} from "../controller/PaymentController";

export const paymentRoutes = [
    {
        method: "post",
        route: "/mpesa/hook",
        controller: PaymentController,
        action: "save"
    }, {
        method: "post",
        route: "/mpesa/request",
        controller: PaymentController,
        action: "requestPayment"
    }
]
