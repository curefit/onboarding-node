import {controller, httpGet, httpPost} from "inversify-express-utils"
import * as express from "express"
import {inject} from "inversify";
import {TYPES} from "../ioc/types";
import {IOrderService} from "../service/IOrderService";
import {CreateOrderParams} from "../common/CreateOrderParams";

@controller("/echo")
export class EchoController {
    constructor(
    ) {}

    @httpGet("/")
    public echoStuff(request: express.Request): Promise<string> {
        return Promise.resolve("Hello World");
    }
}