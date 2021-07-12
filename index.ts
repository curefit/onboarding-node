import * as Inversify from "inversify"
import "reflect-metadata"
import { Module } from "./Module"
import { TYPES } from "./types"
import { IOrderService } from "./IOrderService"

const kernel: Inversify.Container = new Inversify.Container()
kernel.load(Module(kernel))

const orderService: IOrderService = kernel.get(TYPES.OrderService)
orderService.createOrder()