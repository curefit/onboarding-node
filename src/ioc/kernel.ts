import { Container } from "inversify"

import { AppConfigKernelModule } from "./AppConfigModule"
import { ApplicationModule } from "./ApplicationModule"
import { BaseKernelModule } from "@curefit/base"
import { MongoModule } from "@curefit/mongo-utils"
import { ErrorCommonModule } from "@curefit/error-common"
import { ServerModule } from "@curefit/server"

const kernel: Container = new Container()

kernel.load(
	AppConfigKernelModule(kernel),
    BaseKernelModule(kernel),
    MongoModule(kernel),
    ErrorCommonModule(kernel),
	ServerModule(kernel),
    ApplicationModule(kernel)
)

export default kernel