import {controller, httpPost, httpGet} from "inversify-express-utils"
import * as express from "express"
import {inject} from "inversify";
import {TYPES} from "../ioc/types";
import {IOrderService} from "../service/IOrderService";
import {Order} from "../common/Order";

@controller("/order")
export class OrderController {
    constructor(
        @inject(TYPES.OrderService) private orderService: IOrderService
    ) {}

    @httpPost("/")
    public createOrder(request: express.Request) {
        return this.orderService.createOrder(request.body as Order)
    }

    @httpGet("/:id")
    public findOrder(request: express.Request) {
        return this.orderService.findOrder(request.params.id)
    }
}