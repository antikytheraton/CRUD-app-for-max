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
    data.save(err => err ? res.sendStatus(400) : res.send(`Product created successfully`))
}

// exports.data_details = (req, res) => {
//     Max.findOne(
//         {fb_id: req.params.fb_id},
//         (err, data) => err ? res.sendStatus(400) : res.send(data)
//     )
// }


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


exports.data_delete = (req, res) => {
    Max.findOneAndDelete(
        {fb_id: req.params.fb_id},
        err => err ? res.sendStatus(400) : res.status(204).send(`Deleted successfully!`)
    )
}

exports.data_update = (req, res) => {
    const dataToUpdate = Max.findOneAndRemove(
        {fb_id: req.params.fb_id},
        (err, doc) => {
            const dict = [obj1(req), obj2(doc)].reduce(
                (new_dict, old_dict) => {
                    Object.keys(old_dict).forEach(k => new_dict[k] = old_dict[k])
                    Object.keys(new_dict).forEach(k => new_dict[k] = obj1(req)[k])
                    return new_dict
                }
            , {})
            return err || isEmpty(doc || {}) == true ?
            res.sendStatus(400) :
            save_again(res, dict, req.params.fb_id)
        }
    )
    dataToUpdate
}

const save_again = (res, dict, fb_id) => {
    const data = new Max(
        {
            'fb_id': fb_id,
            'data': dict
        }
    )
    // console.log(data)
    data.save(err => err ? res.sendStatus(400) : res.send(data))
}

const obj1 = (req) => req.body || {}

const obj2 = (doc) => isEmpty(doc || {}) ? {} : doc._doc.data

const isEmpty = (obj) => Object.keys(obj).length === 0
