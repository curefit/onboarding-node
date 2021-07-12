import express from 'express';
import mongoose from 'mongoose';
import { userController } from './controllers/UserController'
import { json } from 'body-parser';

// Connect to MongoDB database
mongoose
    .connect("mongodb://localhost:27017/testDb", { useNewUrlParser: true })
    .then(() => {
        console.log(`connected to the DB`)
        const app = express()
        app.use(json())
        app.use(userController)
        app.listen(8000, () => {
            console.log(`App is listening at http://localhost:${8000}`)
        })
    })