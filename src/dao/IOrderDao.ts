import { IRead, IWrite } from "@curefit/mongo-utils"
import {Order} from "../common/Order";

export interface IOrderReadonlyDao extends IRead<Order> {
}

export interface IOrderReadWriteDao extends IRead<Order>, IWrite<Order> {
}