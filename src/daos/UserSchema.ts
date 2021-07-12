import Mongoose from 'mongoose'
import { IUser } from "../models/User"

interface UserModelInterface extends Mongoose.Model<UserModel> {}

interface UserModel extends IUser, Mongoose.Document {}

const userSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: Number
})


const User = Mongoose.model<UserModel, UserModelInterface>('User', userSchema)


export { User }
