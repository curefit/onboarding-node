import {inject, injectable} from "inversify";
import {BASE_TYPES, ILogger} from "@curefit/base";
import {TYPES} from "../ioc/types";
import {IOrderReadWriteDao} from "../dao/IOrderDao";
import {Order} from "../common/Order";
import {IOrderService} from "./IOrderService";

@injectable()
export class OrderService implements IOrderService {
    constructor(@inject(BASE_TYPES.ILogger) private logger: ILogger,
                @inject(TYPES.OrderReadwriteDao) private orderDao: IOrderReadWriteDao
    ) {
    }

    createOrder(order: Order): Promise<Order> {
        return this.orderDao.create(order)
    }

    findOrder(id: string): Promise<Order> {
        return this.orderDao.findOne({
            condition: {
                "orderId": id
            }
        })
    }
}