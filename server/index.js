const express = require('express')
const app = express()
const cors = require('cors')
const port = 3044
require('dotenv').config()
const router = require('./config/routes')

app.use(express.json())
app.use(cors())
app.use(router)
app.use('/uploads',express.static('uploads'))

const configureDb = require('./config/database')
configureDb()

app.listen(port,()=>{
    console.log('Server is running on port',port)
})