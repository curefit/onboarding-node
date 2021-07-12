import {Employee} from "../common/Employee";

export interface IEmployeeService {
    createEmployee(employee: Employee): Promise<Employee>
}