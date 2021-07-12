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

export function ApplicationModule(kernel: Inversify.Container): ContainerModule {
    return new Inversify.ContainerModule((bind: Inversify.interfaces.Bind) => {
        EmployeeController
        bind<EmployeeSchema>(TYPES.EmployeeSchema).to(EmployeeSchema).inSingletonScope()
        bind<IEmployeeReadonlyDao>(TYPES.EmployeeReadOnlyDao).to(EmployeeReadonlyDaoMongoImpl).inSingletonScope()
        bind<IEmployeeReadWriteDao>(TYPES.EmployeeReadwriteDao).to(EmployeeReadWriteDaoMongoImpl).inSingletonScope()
        bind<IEmployeeService>(TYPES.EmployeeService).to(EmployeeService).inSingletonScope()
    })
}