import {controller, httpGet, httpPost} from "inversify-express-utils"
import * as express from "express"
import {inject} from "inversify";
import {TYPES} from "../ioc/types";
import {IOrderService} from "../service/IOrderService";
import {CreateOrderParams} from "../common/CreateOrderParams";
import {ERROR_COMMON_TYPES, RollbarService} from "@curefit/error-common";

@controller("/echo")
export class EchoController {
    constructor(
        @inject(ERROR_COMMON_TYPES.RollbarService) private rollbarService: RollbarService,
    ) {}

    @httpGet("/")
    public echoStuff(request: express.Request): Promise<string> {
        let i = 0;
        while (i < 10) {
            this.rollbarService.sendError(new Error("Shit's going down!!"));
            i += 1;
        }

        return Promise.resolve("Hello World");
    }
}