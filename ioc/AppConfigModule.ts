import * as Inversify from "inversify"
import "reflect-metadata"
import { BASE_TYPES } from "@curefit/base"
import { RedisControllerFactory } from "../controllers/RedisController"
import { MessagingControllerFactory } from "../controllers/MessagingController"
import QueueConsumer from "../consumers/QueueConsumer"
import { TYPES } from "./types"

export function AppConfigKernelModule(kernel: Inversify.Container) {
  return new Inversify.ContainerModule((bind: Inversify.interfaces.Bind) => {
    RedisControllerFactory(kernel)
    MessagingControllerFactory(kernel)
    bind<string>(BASE_TYPES.ConfigurationDirectory).toConstantValue("conf")
    bind<QueueConsumer>(TYPES.QueueConsumer).to(QueueConsumer).inSingletonScope()
  })
}
