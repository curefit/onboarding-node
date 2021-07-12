import Mongoose from 'mongoose'

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
}

interface UserModelInterface extends Mongoose.Model<UserModel> {
}

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
