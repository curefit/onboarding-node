import * as Inversify from "inversify"
import {ContainerModule} from "inversify"
import {TYPES} from "./types"
import {EmployeeSchema} from "../models/EmployeeSchema";
import {IEmployeeReadonlyDao, IEmployeeReadWriteDao} from "../dao/IEmployeeDao";
import {EmployeeReadonlyDaoMongoImpl} from "../dao/EmployeeReadOnlyDaoImpl";
import {EmployeeReadWriteDaoMongoImpl} from "../dao/EmployeeReadWriteDaoImpl";
import {IEmployeeService} from "../service/IEmployeeService";
import {EmployeeService} from "../service/EmployeeService";
import {EmployeeController} from "../controller/EmployeeController";
import {OrderSchema} from "../models/OrderSchema";
import {IOrderReadonlyDao, IOrderReadWriteDao} from "../dao/IOrderDao";
import {OrderReadonlyDaoMongoImpl} from "../dao/OrderReadOnlyDaoImpl";
import {OrderReadWriteDaoMongoImpl} from "../dao/OrderReadWriteDaoImpl";
import {IOrderService} from "../service/IOrderService";
import {OrderService} from "../service/OrderService";
import {OrderController} from "../controller/OrderController";

export function ApplicationModule(kernel: Inversify.Container): ContainerModule {
    return new Inversify.ContainerModule((bind: Inversify.interfaces.Bind) => {
        EmployeeController
        OrderController
        bind<EmployeeSchema>(TYPES.EmployeeSchema).to(EmployeeSchema).inSingletonScope()
        bind<IEmployeeReadonlyDao>(TYPES.EmployeeReadOnlyDao).to(EmployeeReadonlyDaoMongoImpl).inSingletonScope()
        bind<IEmployeeReadWriteDao>(TYPES.EmployeeReadwriteDao).to(EmployeeReadWriteDaoMongoImpl).inSingletonScope()
        bind<IEmployeeService>(TYPES.EmployeeService).to(EmployeeService).inSingletonScope()
        bind<OrderSchema>(TYPES.OrderSchema).to(OrderSchema).inSingletonScope()
        bind<IOrderReadonlyDao>(TYPES.OrderReadOnlyDao).to(OrderReadonlyDaoMongoImpl).inSingletonScope()
        bind<IOrderReadWriteDao>(TYPES.OrderReadwriteDao).to(OrderReadWriteDaoMongoImpl).inSingletonScope()
        bind<IOrderService>(TYPES.OrderService).to(OrderService).inSingletonScope()

    })
}