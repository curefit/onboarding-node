import {Order} from "../common/Order";

export interface IOrderService {
    createOrder(order: Order): Promise<Order>
    findOrder(id: string): Promise<Order>
}