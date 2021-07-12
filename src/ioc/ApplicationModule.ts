import {OrderController} from "../controller/OrderController"
import * as Inversify from "inversify"
import {ContainerModule} from "inversify"
import {TYPES} from "./types"
import {OrderSchema} from "../model/OrderSchema"
import {IOrderReadonlyDao, IOrderReadWriteDao} from "../dao/IOrderDao"
import {OrdersReadWriteDaoMongoImpl} from "../dao/OrderReadWriteDaoImpl"
import {OrdersReadonlyDaoMongoImpl} from "../dao/OrderReadOnlyDaoImpl";
import {IOrderService} from "../service/IOrderService";
import {OrderService} from "../service/OrderService";
import {IProductService} from "../service/IProductService";
import {ProductService} from "../service/ProductService";

export function ApplicationModule(kernel: Inversify.Container): ContainerModule {
    return new Inversify.ContainerModule((bind: Inversify.interfaces.Bind) => {
    	OrderController
        bind<OrderSchema>(TYPES.OrderSchema).to(OrderSchema).inSingletonScope()
        bind<IOrderReadWriteDao>(TYPES.OrderReadwriteDao).to(OrdersReadWriteDaoMongoImpl).inSingletonScope()
        bind<IOrderReadonlyDao>(TYPES.OrderReadOnlyDao).to(OrdersReadonlyDaoMongoImpl).inSingletonScope()
        bind<IOrderService>(TYPES.OrderService).to(OrderService).inSingletonScope()
        bind<IProductService>(TYPES.ProductService).to(ProductService).inSingletonScope()
    })
}