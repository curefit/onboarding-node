import { BASE_TYPES, ILogger } from "@curefit/base"
import { MongoReadWriteDao } from "@curefit/mongo-utils"
import { injectable, inject } from "inversify"
import {OrderModel, OrderSchema} from "../model/OrderSchema";
import {Order} from "../common/Order";
import {TYPES} from "../ioc/types";
import {OrdersReadonlyDaoMongoImpl} from "./OrderReadOnlyDaoImpl";

@injectable()
export class OrdersReadWriteDaoMongoImpl extends MongoReadWriteDao<OrderModel, Order> {
    constructor(@inject(TYPES.OrderSchema) orderSchema: OrderSchema,
                @inject(TYPES.OrderReadOnlyDao) readonlyDao: OrdersReadonlyDaoMongoImpl,
                @inject(BASE_TYPES.ILogger) logger: ILogger
    ) {
        super(orderSchema.mongooseModel, readonlyDao, logger)
    }
}
