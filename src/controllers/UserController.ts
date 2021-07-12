import express, { Request, Response } from 'express'
import { IUser } from "../models/User"
import UserService from "../services/UserService"

const router = express.Router()

router.get('/api/user', async (req: Request, res: Response): Promise<IUser[]> => {
    const users: IUser[] = await UserService.listUsers()
    return res.status(200).send(users)
})

router.post('/api/user', async (req: Request, res: Response): Promise<IUser> => {
    const { firstName, lastName, email, age } = req.body
    const user = { firstName, lastName, email, age }
    const createdUser: IUser = await UserService.createUser(user)
    return res.status(201).send(createdUser)
})

router.get('/api/user/:userId', async (req: Request, res: Response): Promise<IUser> => {
    const user: IUser = await UserService.getUserById(req.params.userId)
    return res.status(200).send(user)
})

export { router as userController }