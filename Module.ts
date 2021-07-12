import * as Inversify from "inversify"
import { TYPES } from "./types"
import { IEmailService } from "./IEmailService"
import { AWSEmailService } from "./AWSEmailService"
import { IOrderService } from "./IOrderService"
import { OrderService } from "./OrderService"

export function Module(kernel: Inversify.Container) {
	return new Inversify.ContainerModule((bind: Inversify.interfaces.Bind) => {
		bind<IEmailService>(TYPES.AWSEmailService).to(AWSEmailService)
		bind<IOrderService>(TYPES.OrderService).to(OrderService)
	})
}