import { BASE_TYPES, ILogger } from "@curefit/base"
import { MongoReadWriteDao } from "@curefit/mongo-utils"
import { injectable, inject } from "inversify"
import {TYPES} from "../ioc/types";
import {EmployeeModel, EmployeeSchema} from "../models/EmployeeSchema";
import {Employee} from "../common/Employee";
import {EmployeeReadonlyDaoMongoImpl} from "./EmployeeReadOnlyDaoImpl";

@injectable()
export class EmployeeReadWriteDaoMongoImpl extends MongoReadWriteDao<EmployeeModel, Employee> {
    constructor(@inject(TYPES.EmployeeSchema) employeeSchema: EmployeeSchema,
                @inject(TYPES.EmployeeReadOnlyDao) readonlyDao: EmployeeReadonlyDaoMongoImpl,
                @inject(BASE_TYPES.ILogger) logger: ILogger
    ) {
        super(employeeSchema.mongooseModel, readonlyDao, logger)
    }
}
