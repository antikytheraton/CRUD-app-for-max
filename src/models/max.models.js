'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const dataSchema = new Schema({ data: Object })

const MaxSchema = new Schema({
    fb_id: {type: String, required: true, max: 100},
    data: {type: Object, default: {}}
})

module.exports = mongoose.model('Max', MaxSchema)
