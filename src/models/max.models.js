'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MaxSchema = new Schema({
    fb_id: {type: String, required: true, max: 100},
    data: {type: Object, required: true}
})

module.exports = mongoose.model('Max', MaxSchema)
