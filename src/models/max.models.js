'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MaxSchema = new Schema({
    fb_id: {
        type: String,
        required: true,
        max: 100,
        unique: true
    },
    data: {type: Object, default: {}}
})

module.exports = mongoose.model('Max', MaxSchema)
