import {controller, httpGet, httpPost} from "inversify-express-utils"
import * as express from "express"
import {inject} from "inversify";
import {TYPES} from "../ioc/types";
import {IOrderService} from "../service/IOrderService";
import {CreateOrderParams} from "../common/CreateOrderParams";
import { ERROR_COMMON_TYPES, RollbarService } from "@curefit/error-common"
import {BASE_TYPES, ILogger} from "@curefit/base";

@controller("/issue")
export class IssueController {
    constructor(
        @inject(BASE_TYPES.ILogger) private logger: ILogger,
        @inject(ERROR_COMMON_TYPES.RollbarService) private rollbarService: RollbarService,
    ) {}

    @httpGet("/test")
    public testFunction(request: express.Request): Promise<boolean> {
        this.logger.info("In test function!");
        return Promise.resolve(true);
    }

    @httpGet("/memory")
    public createIssue(request: express.Request) {
        this.logger.info("In create memory issue!!");

        function alloc (size) {
            const numbers = size / 8;
            const arr = []
            arr.length = numbers;
            for (let i = 0; i < numbers; i++) {
                arr[i] = i;
            }
            return arr;
        };

        const allocations = [];

        function allocToMax () {

            console.log("Start");

            const field = 'heapUsed';
            const mu = process.memoryUsage();
            console.log(mu);
            const gbStart = mu[field] / 1024 / 1024 / 1024;
            console.log(`Start ${Math.round(gbStart * 100) / 100} GB`);

            let allocationStep = 100 * 1024;

            while (true) {
                // Allocate memory.
                const allocation = alloc(allocationStep);

                // Allocate and keep a reference so the allocated memory isn't garbage collected.
                allocations.push(allocation);

                // Check how much memory is now allocated.
                const mu = process.memoryUsage();
                const mbNow = mu[field] / 1024 / 1024 / 1024;
                //console.log(`Total allocated       ${Math.round(mbNow * 100) / 100} GB`);
                console.log(`Allocated since start ${Math.round((mbNow - gbStart) * 100) / 100} GB`);
            }
        };

        allocToMax();

        return Promise.resolve(true);
    }
}