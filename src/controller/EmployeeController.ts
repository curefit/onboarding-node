import {controller, httpPost} from "inversify-express-utils"
import * as express from "express"
import {inject} from "inversify";
import {TYPES} from "../ioc/types";
import {IEmployeeService} from "../service/IEmployeeService";
import {Employee} from "../common/Employee";

@controller("/employee")
export class EmployeeController {
    constructor(
        @inject(TYPES.EmployeeService) private employeeService: IEmployeeService
    ) {}

    @httpPost("/")
    public createOrder(request: express.Request) {
        return this.employeeService.createEmployee(request.body as Employee)
    }
}