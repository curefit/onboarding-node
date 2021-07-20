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
    private referenceHolder: string[]

    constructor(
        @inject(BASE_TYPES.ILogger) private logger: ILogger,
        @inject(ERROR_COMMON_TYPES.RollbarService) private rollbarService: RollbarService,
    ) {
        this.referenceHolder = []
    }

    @httpGet("/rollbar")
    public testFunction(request: express.Request): Promise<boolean> {
        this.rollbarService.sendError(new Error("This is a test error!!"));
        return Promise.resolve(true);
    }

    @httpGet("/cpu")
    public createCpuIssue(request: express.Request): Promise<boolean> {
        let count = 0;
        for(let i = 0; i < 1000000000000000; i++) {
            count += 1;
        }

        return Promise.resolve(true);
    }

    // @httpGet("/memory")
    // public createMemoryIssue(request: express.Request): Promise<boolean> {
    //
    // }

    @httpGet("/crash")
    public createCrashIssue(request: express.Request) {
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

            let i = 10000;
            while (i > 0) {
                // Allocate memory.
                const allocation = alloc(allocationStep);

                // Allocate and keep a reference so the allocated memory isn't garbage collected.
                allocations.push(allocation);

                // Check how much memory is now allocated.
                const mu = process.memoryUsage();
                const mbNow = mu[field] / 1024 / 1024 / 1024;
                console.log(`Allocated since start ${Math.round((mbNow - gbStart) * 100) / 100} GB`);
                i -= 1;
            }
        };

        allocToMax();

        return Promise.resolve(true);
    }
}