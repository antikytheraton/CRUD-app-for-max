'use strict'
const Max = require('../models/max.models')
const mongoose = require('mongoose')

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
    data.save(err => err ? res.sendStatus(400) : res.send(`Product created successfully`))
}

exports.data_details = (req, res) => {
    Max.findOne(
        {fb_id: req.params.fb_id},
        (err, data) => {
            if (err) {console.log(err)}
            if (data) {
                res.send(data)
            } else {
                const extras = new Max({'fb_id': req.params.fb_id, 'data': {'state': 0}})
                extras.save(err2 => err2 ? console.log(err2) : res.send(extras))
            }
        }
    )
}

exports.data_update = (req, res) => {
    Max.findOneAndRemove(
        {fb_id: req.params.fb_id}
    ).lean().exec((err, doc) => {
        if (err) { res.sendStatus(400) }
        const mergedData = mergeDataJSON(findedDocument(doc), req.body)
        save_again(res, mergedData, req.params.fb_id)
    })
}

exports.data_delete = (req, res) => {
    Max.findOneAndDelete(
        {fb_id: req.params.fb_id},
        err => err ? res.sendStatus(400) : res.status(204).send(`Deleted successfully!`)
    )
}

const save_again = (res, dict, fb_id) => {
    const data = new Max(
        {
            'fb_id': fb_id,
            'data': dict
        }
    )
    data.save(err => err ? res.sendStatus(400) : res.send(data))
}

const isEmpty = (obj) => Object.keys(obj).length === 0

const mergeDataJSON = (saved_data, new_data) => {
    const data = Object.assign({}, saved_data, new_data)
    return data
}

const findedDocument = (doc) => isEmpty(doc || {}) ? {} : doc.data
