import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './routes/User'
import { json } from 'body-parser';

// Connect to MongoDB database
mongoose
    .connect("mongodb://localhost:27017/testDb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`connected to the DB`)
        const app = express()
        app.use(json())
        app.use(userRouter)
        app.listen(8000, () => {
            console.log(`App is listening at http://localhost:${8000}`)
        })
    })