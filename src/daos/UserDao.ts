import { IUser } from '../models/User'
import { User } from './UserSchema'

class UsersDao {

    async addUser(user: IUser): Promise<IUser> {
        const userCreated = new User(user);
        await userCreated.save();
        return userCreated;
    }

    async getUserById(userId: string): Promise<IUser> {
        return User.findOne({ _id: userId });
    }

    async getUsers(): Promise<IUser[]> {
        return User.find()
    }
}

export default new UsersDao();