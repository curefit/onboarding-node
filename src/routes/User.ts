import express, { Request, Response } from 'express'
import { User } from '../models/User'

const router = express.Router()

router.get('/api/user', async (req: Request, res: Response) => {
    const user = await User.find({})
    return res.status(200).send(user)
})

router.post('/api/user', async (req: Request, res: Response) => {
    const { firstName, lastName, email, age } = req.body;
    // console.log("body====", firstName, lastName, email, age);
    const user = new User({ firstName, lastName, email, age })
    await user.save()
    return res.status(201).send(user)
})

export { router as userRouter }