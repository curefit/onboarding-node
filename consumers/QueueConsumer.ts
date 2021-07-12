import {BASE_TYPES, FetchUtilV2, ILogger} from "@curefit/base"
import {BaseDelayedBatchedQueueHandler, IQueueService, Message, SQS_CLIENT_TYPES} from "@curefit/sqs-client"
import {inject, injectable} from "inversify"
import * as util from "util"


@injectable()
class QueueConsumer extends BaseDelayedBatchedQueueHandler {

    constructor(
        @inject(SQS_CLIENT_TYPES.QueueService) queueService: IQueueService,
        @inject(BASE_TYPES.ILogger) private logger: ILogger,
        @inject(BASE_TYPES.FetchUtilV2) private fetchHelper: FetchUtilV2
    ) {
        super("rohit-test", 10, queueService, 0)
        this.logger.info("Started queue consumer")
    }

    async handle(messages: Message[]): Promise<boolean[]> {
        const results: Promise<boolean>[] = []
        for (const message of messages) {
            results.push(this.handleMessage(message.data, message.attributes))
        }
        return await Promise.all(results)
    }

    async handleMessage(message: string, attributes: { [key: string]: any }): Promise<boolean> {
        this.logger.info(`Got message: ${message}, attributes: ${util.inspect(attributes)}`)
        return true
    }

}

export default QueueConsumer
