import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import * as prettyjson from "prettyjson";
import axios from "axios";

const mpesaAuthUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
const darajaSandBoxUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

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

        console.log(prettyjson.render(request.body, options));

        response.json(message)
    }

    async stkPush(request, response) {

        let auth = `Bearer ${request.token}`;
        let timestamp = getTimestamp();


        let bsShortCode = process.env.short_code;

        let passkey = process.env.passkey;

        let formattedPass = `${bsShortCode}${passkey}${timestamp}`

        let password = Buffer.from(formattedPass).toString('base64');
        let type = "CustomerPayBillOnline";

        let partyA = formatPhoneNumber(response, request.body.phone);
        let partyB = process.env.short_code;

        let callBackUrl = "http://525971ceac11.ngrok.io/mpesa/hook";
        let accountReference = "test";
        let transactionDesc = "test";

        let amount = validateAmount(response, parseInt(request.body.amount))


        let data = {
            BusinessShortCode: bsShortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: type,
            Amount: amount,
            PartyA: partyA,
            PartyB: partyB,
            PhoneNumber: partyA,
            AccountReference: accountReference,
            TransactionDesc: transactionDesc,
            CallBackURL: callBackUrl
        }

        let config = {
            headers: {
                Authorization: auth,
            }
        }

        try {
            await axios.post(darajaSandBoxUrl, data, config).then(res => {
                return response.send({
                    success: true,
                    message: res.data
                });
            }).catch(e => {
                return response.send({
                    success: false,
                    message: e['response']['statusText']
                });
            })

        } catch (e) {
            return response.send({
                success: false,
                message: e['response']['statusText']
            });
        }


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

export class PaymentController {

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


const formatPhoneNumber = (response, phoneNumber: string) => {
    let formatted = parseInt(`254${phoneNumber.substring(1)}`)
    if (numberIsValid(formatted)) return formatted;
    return response.status(400).json({status: "invalid_phone_number", desc: "Bad Request"})
}


const numberIsValid = (formatted) => {
    let _pattern = /^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;
    return _pattern.test(formatted);
}

const validateAmount = (response, amount) => {
    if (isNaN(amount) || amount < 1) {
        response.status(400)
            .json({"status": "invalid_amount", description: "Bad Request"});
    }
    return amount;
}

const getTimestamp = () => {

    let date = new Date()

    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }

    return date.getFullYear() +
        pad2(date.getMonth() + 1) +
        pad2(date.getDate()) +
        pad2(date.getHours()) +
        pad2(date.getMinutes()) +
        pad2(date.getSeconds());
}