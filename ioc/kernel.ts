import { Container } from "inversify"

import { AppConfigKernelModule } from "./AppConfigModule"
import { BaseKernelModule } from "@curefit/base"
import { MongoModule } from "@curefit/mongo-utils"
import { ErrorCommonModule } from "@curefit/error-common"
import { ServerModule } from "@curefit/server"
import { RedisModule } from "@curefit/redis-utils"
import { EventsModule } from "@curefit/events-util"
import { SqsClientModule } from "@curefit/sqs-client"

const kernel: Container = new Container()

kernel.load(
	AppConfigKernelModule(kernel),
    BaseKernelModule(kernel),
    MongoModule(kernel),
    ErrorCommonModule(kernel),
	ServerModule(kernel),
	RedisModule(kernel),
	EventsModule(kernel),
	SqsClientModule(kernel)
)

export default kernel
