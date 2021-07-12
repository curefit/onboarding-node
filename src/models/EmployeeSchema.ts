import {inject, injectable} from "inversify"

import {MONGO_TYPES, MultiMongooseAccess, MultiMongooseSchema} from "@curefit/mongo-utils"
import * as Mongoose from "mongoose"
import {Schema} from "mongoose"
import {Employee} from "../common/Employee";

export interface EmployeeModel extends Employee, Mongoose.Document {}

@injectable()
export class EmployeeSchema extends MultiMongooseSchema<EmployeeModel> {
    constructor(@inject(MONGO_TYPES.MultiMongooseAccess) mongooseAccess: MultiMongooseAccess) {
        super(mongooseAccess, "employee", "DEFAULT")
    }

    protected schema() {
        return {
            employeeId: {
                type: String,
                required: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            age: {
                type: Number,
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
            }
        }
    }
}