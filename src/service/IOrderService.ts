import {CreateOrderParams} from "../common/CreateOrderParams";
import {Order} from "../common/Order";

export interface IOrderService {
    createOrder(createOrderParams: CreateOrderParams): Promise<Order>
}