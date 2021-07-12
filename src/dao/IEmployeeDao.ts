import { IRead, IWrite } from "@curefit/mongo-utils"
import {Employee} from "../common/Employee";

export interface IEmployeeReadonlyDao extends IRead<Employee> {
}

export interface IEmployeeReadWriteDao extends IRead<Employee>, IWrite<Employee> {
}