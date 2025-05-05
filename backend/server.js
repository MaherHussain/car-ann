import dbconnection from './db/connection.js'
import express from 'express'
import config from './config.js'

const app = express()

const port  = config.port
dbconnection()
app.get('/', (req, res) => {
    res.send('Hello World i am new test test !')
})

app.listen(port, () => {
    console.log(`The app listening on port ${port}`)
})