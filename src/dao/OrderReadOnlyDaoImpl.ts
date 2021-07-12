import { BASE_TYPES, ILogger } from "@curefit/base"
import { MongoReadonlyDao } from "@curefit/mongo-utils"
import { injectable, inject } from "inversify"
import {TYPES} from "../ioc/types"
import {OrderModel, OrderSchema} from "../model/OrderSchema";
import {Order} from "../common/Order";

@injectable()
export class OrdersReadonlyDaoMongoImpl extends MongoReadonlyDao<OrderModel, Order> {
    constructor(@inject(TYPES.OrderSchema) orderSchema: OrderSchema,
                @inject(BASE_TYPES.ILogger) logger: ILogger) {
        super(orderSchema.mongooseModel, logger, orderSchema.isLeanQueryEnabled)
    }
}