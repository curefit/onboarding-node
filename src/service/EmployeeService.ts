import {inject, injectable} from "inversify";
import {BASE_TYPES, ILogger} from "@curefit/base";
import {TYPES} from "../ioc/types";
import {IEmployeeService} from "./IEmployeeService";
import {IEmployeeReadWriteDao} from "../dao/IEmployeeDao";
import {Employee} from "../common/Employee";

@injectable()
export class EmployeeService implements IEmployeeService {
    constructor(@inject(BASE_TYPES.ILogger) private logger: ILogger,
                @inject(TYPES.EmployeeReadwriteDao) private employeeDao: IEmployeeReadWriteDao
    ) {
    }

    createEmployee(employee: Employee): Promise<Employee> {
        return this.employeeDao.create(employee)
    }
}