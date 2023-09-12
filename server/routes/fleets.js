const { response } = require('express')
const express = require('express')
const {
    createFleet,
    getFleets,
    deleteFleet,
    updateFleet
} = require('../controllers/fleetController')

const router = express.Router()

router.get('/', getFleets)
router.post('/', createFleet)
router.delete('/', deleteFleet)
router.patch('/', updateFleet)

module.exports = router
