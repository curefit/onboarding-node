import UsersDao from '../daos/UserDao'
import { IUser } from "../models/User"

class UserService {
    async createUser(user: IUser): Promise<IUser> {
        return UsersDao.addUser(user)
    }

    async listUsers(): Promise<IUser[]> {
        return UsersDao.getUsers()
    }

    async getUserById(id: string): Promise<IUser> {
        return UsersDao.getUserById(id)
    }
}
export default new UserService();
