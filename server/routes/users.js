const { response } = require('express')
const express = require('express')
const {
    createUser,
    getUser
} = require('../controllers/userController')


// Express router object we're using
const router = express.Router()

// Login endpoint (GET a user)
router.get('/', getUser)

// Register endpoint (POST a user)
router.post('/', createUser)

module.exports = router