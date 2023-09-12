const { response } = require('express')
const express = require('express')
const {
    createFleet,
    getFleets,
    deleteFleet
} = require('../controllers/fleetController')

const router = express.Router()

router.get('/', getFleets)
router.post('/', createFleet)
router.delete('/', deleteFleet)

module.exports = router
