'use strict'
const express = require('express')
const router = express.Router()

const max_controller =  require('../controllers/max.controller')

router.get('/test', max_controller.test)
router.post('/create', max_controller.data_create)
router.get('/:fb_id', max_controller.data_details)
router.patch('/:fb_id/update', max_controller.data_update)
router.delete('/:fb_id/delete', max_controller.data_delete)

module.exports = router
