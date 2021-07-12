import {inject, injectable} from "inversify"

import {MONGO_TYPES, MultiMongooseAccess, MultiMongooseSchema} from "@curefit/mongo-utils"
import * as Mongoose from "mongoose"
import {Schema} from "mongoose"
import {Order} from "../common/Order";

export interface OrderModel extends Order, Mongoose.Document {}

@injectable()
export class OrderSchema extends MultiMongooseSchema<OrderModel> {
    constructor(@inject(MONGO_TYPES.MultiMongooseAccess) mongooseAccess: MultiMongooseAccess) {
        super(mongooseAccess, "orders", "DEFAULT")
    }

    protected schema() {
        return {
            userId: {
                type: String,
                required: true
            },
            products: {
                type: [new Schema({
                    productId: {
                        type: String,
                        required: true
                    },
                    title: {
                        type: String,
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    },
                    quantity: {
                        type: Number,
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
                type: String,
                required: true
            }
        }
    }
}