import {controller, httpGet} from "inversify-express-utils"
import * as express from "express"
import {inject} from "inversify";
import { ERROR_COMMON_TYPES, RollbarService } from "@curefit/error-common"
import {BASE_TYPES,HttpClient, ILogger} from "@curefit/base";

@controller("/hello")
export class HelloController {
    private referenceHolder: string[]

    constructor(
        @inject(BASE_TYPES.ILogger) private logger: ILogger,
        @inject(ERROR_COMMON_TYPES.RollbarService) private rollbarService: RollbarService,
        @inject(BASE_TYPES.HttpClient) private httpClient: HttpClient,
    ) {
        this.referenceHolder = []
    }

    @httpGet("/:name")
    public printNameFunction(request: any): Promise<any> {
        const { name } = request.params
        this.logger.info(`Hello from ${name}!`);
        return Promise.resolve("OK");
    }

    @httpGet("/:name/voyager")
    public printInVoyager(request: any): Promise<any> {

        const { name } = request.params
        const voyagerEndpointURL = `https://${process.env.VOYAGER_URL}/logging/${name}`
        const headers = {
            "Content-Type": "application/json;charset=UTF-8"
        }
        this.logger.info(`Calling voyager with name as input.`);

        return this.httpClient.get(voyagerEndpointURL, headers)
    }
}