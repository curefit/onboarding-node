import * as Inversify from "inversify"
import "reflect-metadata"
import { BASE_TYPES } from "@curefit/base"

export function AppConfigKernelModule(kernel: Inversify.Container) {
  return new Inversify.ContainerModule((bind: Inversify.interfaces.Bind) => {
    bind<string>(BASE_TYPES.ConfigurationDirectory).toConstantValue("conf")
  })
}
