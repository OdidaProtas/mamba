import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import * as prettyjson from "prettyjson";
import axios from "axios";

const mpesaAuthUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";


export class GeneralController {
    async one(request: Request, response: Response, next: NextFunction) {
        return "Dreamer"
    }
}

const options = {
    noColor: false
}

export class PaymentController {

    async save(request: Request, response: Response, next: NextFunction) {
        let message = {
            "ResponseCode": "00000000",
            "ResponseDesc": "success"
        }
        response.json(message)
    }

    async stkPush(request, response) {

        let auth = `Bearer ${request.token}`;
        let timestamp = Date.now();

        let bsShortCode = process.env.short_code;
        let passkey = process.env.passkey;

        let password = Buffer.from(`${bsShortCode}${passkey}${timestamp}`).toString('base64');
        let type = "CustomerPayBillOnline";
        let partyA = process.env.partyA;
        let partyB = process.env.short_code;

        let callBackUrl = "";
        let accountReference = "Daraja API sandbox";
        let transactionDesc = "Testing lipa na mpesa functionality";

        try {
            let res = await axios.post(mpesaAuthUrl, {
                BusinessShortCode: bsShortCode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: type,
                Amount: request.body.amount,
                PartyA: partyA,
                partyB: partyB,
                PhoneNumber: formatPhoneNumber(request.body.phone),
                AccountReference: accountReference,
                TransactionDesc: transactionDesc,
                CallBackUrl: callBackUrl
            }, {
                headers: {
                    Authorization: auth
                }
            }).catch(console.log)

            return response.send({
                success: true,
                message: res ? res.data : null
            });

        } catch (e) {
            return response.send({
                success: false,
                message: e['response']['statusText']
            });
        }


        return response.json(request.body)
    }

    async requestPayment(request: Request, response: Response, next: NextFunction) {

        let consumerKey = process.env.consumer_key;
        let consumerSecret = process.env.consumer_secret;

        let buffer = Buffer.from(consumerKey + ":" + consumerSecret);

        let auth = `Basic ${buffer.toString("base64")}`;

        try {
            let {data} = await axios.get(mpesaAuthUrl, {
                "headers": {
                    "Authorization": auth
                }
            })

            request.token = data['access_token'];

            return this.stkPush(request, response);

        } catch (e) {

            return response.json({
                success: false,
                message: e['response']['statusText']
            })
        }
    }
}


export class MessageController {

    private messageRepository = getRepository(Message)

    async save(request: Request, response: Response, next: NextFunction) {
        return this.messageRepository.save(request.body)
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.messageRepository.find();
    }
}

export class Controller {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}


const formatPhoneNumber = (phoneNumber: string) => {
    console.log(phoneNumber)
    return phoneNumber;
}
