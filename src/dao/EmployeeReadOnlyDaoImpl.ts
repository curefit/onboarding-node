import { BASE_TYPES, ILogger } from "@curefit/base"
import { MongoReadonlyDao } from "@curefit/mongo-utils"
import { injectable, inject } from "inversify"
import {TYPES} from "../ioc/types"
import {EmployeeModel, EmployeeSchema} from "../models/EmployeeSchema";
import {Employee} from "../common/Employee";

@injectable()
export class EmployeeReadonlyDaoMongoImpl extends MongoReadonlyDao<EmployeeModel, Employee> {
    constructor(@inject(TYPES.EmployeeSchema) employeeSchema: EmployeeSchema,
                @inject(BASE_TYPES.ILogger) logger: ILogger) {
        super(employeeSchema.mongooseModel, logger, employeeSchema.isLeanQueryEnabled)
    }
}