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

    @httpGet("/:echoString")
    public echoOutStuff(request: express.Request): Promise<string> {
        const echoString: string = request.params.echoString;

        return Promise.resolve(echoString);
    }
}