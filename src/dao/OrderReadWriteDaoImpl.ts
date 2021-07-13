import { BASE_TYPES, ILogger } from "@curefit/base"
import { MongoReadWriteDao } from "@curefit/mongo-utils"
import { injectable, inject } from "inversify"
import {TYPES} from "../ioc/types";
import {OrderModel, OrderSchema} from "../models/OrderSchema";
import {Order} from "../common/Order";
import {OrderReadonlyDaoMongoImpl} from "./OrderReadOnlyDaoImpl";

@injectable()
export class OrderReadWriteDaoMongoImpl extends MongoReadWriteDao<OrderModel, Order> {
    constructor(@inject(TYPES.OrderService) orderSchema: OrderSchema,
                @inject(TYPES.OrderReadOnlyDao) readonlyDao: OrderReadonlyDaoMongoImpl,
                @inject(BASE_TYPES.ILogger) logger: ILogger
    ) {
        super(orderSchema.mongooseModel, readonlyDao, logger)
    }
}
