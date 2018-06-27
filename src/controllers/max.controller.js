'use strict'
const Max = require('../models/max.models')

exports.test = (req, res) => {
    res.send(`Greetings from the Test controller!`)
}

exports.data_create = (req, res) => {
    const data = new Max(
        {
            fb_id: req.body.fb_id,
            data: req.body.data
        }
    )
    data.save(err => err ? next(err) : res.send(`Product created successfully`)
    )
}

exports.data_details = (req, res) => {
    Max.findOne(
        {fb_id: req.params.fb_id},
        (err, data) => err ? next(err) : res.send(data.data)
    )
}

exports.data_update = (req, res) => {
    Max.findOneAndUpdate(
        {fb_id: req.params.fb_id},
        {$set: { data: req.body }},
        (err, data) =>  err ? next(err) : res.send('Data updated')
    )
}

exports.data_delete = (req, res) => {
    Max.findOneAndDelete(
        {fb_id: req.params.fb_id},
        err => err ? next(err) : res.send(`Deleted successfully!`)
    )
}