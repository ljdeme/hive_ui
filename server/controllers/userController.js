const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
process.env.TOKEN_SECRET

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

// get a user 

// TODO: Add logic for: username found, email found, and email login
const getUser = async(req, res) => {
    const username = req.query.username
    const password = req.query.password

    const user = await User.findOne({username: username, password: password})

    if (!user) {

        return res.status(404).json({error: "Incorrect credentials. Please try again or make a new account."})
    }

    token = generateAccessToken({id: username})

    res.status(200).json({token: token, user: user})
}

// create a new user
const createUser = async(req, res) => {
    const {username, password, email} = req.body

    try{
        const user = await User.create({username: username, password: password, email: email })
        return res.status(200).json(user)
    }
    catch(error){
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
    
    
}

module.exports = {
    getUser,
    createUser    
}
