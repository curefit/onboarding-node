import {inject, injectable} from "inversify"

import {MONGO_TYPES, MultiMongooseAccess, MultiMongooseSchema} from "@curefit/mongo-utils"
import * as Mongoose from "mongoose"
import {Schema} from "mongoose"
import {Employee} from "../common/Employee";
import {Order} from "../common/Order";

export interface OrderModel extends Order, Mongoose.Document {}

@injectable()
export class OrderSchema extends MultiMongooseSchema<OrderModel> {
    constructor(@inject(MONGO_TYPES.MultiMongooseAccess) mongooseAccess: MultiMongooseAccess) {
        super(mongooseAccess, "order", "DEFAULT")
    }

    protected schema() {
        return {
            userId: {
                type: String,
                required: true
            },
            orderId: {
                type: String,
                required: true
            },
            product: {
                type: [new Schema({
                    productId:{
                        type: Number,
                        required: true
                    },
                    price: {
                        type:Number,
                        required: true
                    },
                    name:{
                        type: String,
                        required: true
                    }
                })],
                required: true
            },
            address: {
                type: new Schema({
                    line1: {
                        type: String,
                        required: true
                    },
                    line2: {
                        type: String,
                        required: false
                    },
                    city: {
                        type: String,
                        required: true
                    },
                    zipcode: {
                        type: String,
                        required: true
                    }
                }),
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    }
}