import {controller, httpGet, httpPost} from "inversify-express-utils"
import * as express from "express"
import {inject} from "inversify";
import {TYPES} from "../ioc/types";
import {IOrderService} from "../service/IOrderService";
import {CreateOrderParams} from "../common/CreateOrderParams";

@controller("/order")
export class OrderController {
    constructor(
        @inject(TYPES.OrderService) private orderService: IOrderService
    ) {}

    @httpPost("/")
    public createOrder(request: express.Request) {
        return this.orderService.createOrder(request.body as CreateOrderParams)
    }
}