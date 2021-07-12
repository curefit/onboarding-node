import express from 'express'
import { json } from 'body-parser'
const app = express()
const port = 8000

//app.METHOD(PATH, HANDLER)
app.use(json())

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})


app.get('/', (req, res) => {
    res.send('My first experess node server!')
})

app.post('/', (req, res) => {
    console.log("req post body=", req.body)
    res.send(req.body)
})

app.get('/welcome', (req, res) => {
    res.send({"message": "Hello World!"})
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})