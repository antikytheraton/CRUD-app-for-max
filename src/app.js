'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const max = require('./routes/max.routes')

const mongoose = require('mongoose')
const mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, `MongoDB connection error:`))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', max)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})
