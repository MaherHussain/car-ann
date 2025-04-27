const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
    res.send('Hello World i am new test test !')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})